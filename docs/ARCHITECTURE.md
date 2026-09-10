# Architecture map

This file is the deep-dive companion to the root [`CLAUDE.md`](../CLAUDE.md). Read that
first for the short version; come here when you need the full picture before touching
routing, the CMS integration, or auth.

## The big picture

Two independent apps, developed and deployed separately, talking over HTTP:

```
strapi/            Headless CMS (content + its own admin-user auth)
  └─ REST API  ──►  NEXT_PUBLIC_API_URL (e.g. http://localhost:1337)
                          │
next-js/            Frontend (App Router), fetches Strapi at request time
  └─ Postgres  ◄──  DATABASE_URL — a SEPARATE database, only for Auth.js
                     (site visitors' accounts/sessions). Strapi's own
                     content database (sqlite by default, see
                     strapi/config/database.ts) is not this database.
```

There is no shared database and no server-to-server auth between the two apps beyond
plain HTTP. Strapi's `users-permissions` "Public" role controls which content types
`next-js` can read; nothing in `next-js` authenticates to Strapi as a privileged client.

## next-js/src layout

| Path | What lives here |
|---|---|
| `app/layout.tsx` | Root layout. **Does not** render `<html>`/`<body>` — see "One `<html>`, one owner" below. Only wraps context providers (`SlugProvider`, `AuthProvider`). |
| `app/[locale]/layout.tsx` | The *real* document shell: owns `<html>`/`<body>`, fetches the Strapi `global` single type, renders `Navbar`/`Footer`, mounts `ThemeProvider`. Every route renders through this. |
| `app/[locale]/(marketing)/` | Public marketing site: homepage, generic CMS `[slug]` pages, `blog`, `products`. The `(marketing)` segment is a route group — it does not appear in the URL. |
| `app/[locale]/auth/` | Sign-in / register pages (`next-auth/react` client components + `/api/register`). |
| `app/[locale]/user-dashboard/` | The one authenticated page. Server-gated: reads the session with `auth()` and `redirect()`s to sign-in if absent. |
| `app/api/` | `auth/[...nextauth]` (Auth.js handlers), `register` (credentials sign-up), `me` (session probe), `preview` (Strapi draft-mode entry point). |
| `components/dynamic-zone/` | One React component per Strapi dynamic-zone block. See the table below — this is the CMS-driven page-building system. |
| `components/navbar/`, `components/footer.tsx` | The site chrome, CMS-driven (`global.navbar` / `global.footer`) plus the always-present auth controls (`nav-auth-controls.tsx`, not CMS-driven — login state is a client concern). |
| `components/ui/` | Low-level building blocks (shadcn-style `Button`/`DropdownMenu`, the 3D globe, particle backgrounds, carousels). Not page-specific. |
| `components/elements/` | Small typed primitives used across marketing pages (`Button`, `Heading`, `Subheading`). Distinct from `components/ui/Button.tsx` — see gotcha below. |
| `components/dashboard/` | Client components specific to `user-dashboard` (currently just `sign-out-button.tsx`). |
| `lib/strapi/` | `fetchContentType()` (the one function that talks to Strapi) and `strapiImage()` (resolves a Strapi-relative media URL to an absolute one). |
| `lib/shared/` | `PageContent.tsx` (dynamic-zone renderer entry point) and `metadata.ts` (SEO tag builder). |
| `auth.ts` | Auth.js v5 config: GitHub + Yandex OAuth, credentials (email/password via `bcryptjs` + Drizzle), JWT session strategy. |
| `db/` | Drizzle schema + client for the Auth.js Postgres database. `drizzle/` at the project root holds the generated SQL migration. |
| `context/cart-context.tsx` | Client-side cart state for the `products` demo pages. |
| `i18n.config.ts` + `middleware.ts` | Locale list (`en`, `fr`) and the middleware that redirects `/` → `/{locale}` based on `Accept-Language`. |

### One `<html>`, one owner

`app/layout.tsx` and `app/[locale]/layout.tsx` both existed as full document shells at
one point (a leftover from merging two starter templates) — that produced invalid nested
`<html>`/`<body>` markup, which browsers "fix" by silently reordering the DOM, and was
the root cause of a footer-overlap / hydration-error class of bugs. The fix, and the
rule going forward: **only `[locale]/layout.tsx` renders `<html>`/`<body>`.** If you add
a new top-level layout, it must not render either tag — compose inside `[locale]/layout.tsx`
instead. This is also why `ThemeProvider` (next-themes) lives in `[locale]/layout.tsx`
specifically: it injects a script that must be a direct child of `<body>`.

## The dynamic-zone system

A Strapi `page` (or `blog-page`, `product-page`, `article`, ...) has a `dynamic_zone`
field: an ordered list of components, each tagged with a `__component` string like
`"dynamic-zone.header"`. `components/dynamic-zone/manager.tsx` maps that string to a
React component and renders the list — this is the "build a page from Strapi without
writing code" mechanism the README describes.

| `__component` | React component | Strapi component schema |
|---|---|---|
| `dynamic-zone.header` | `header.tsx` | `components/dynamic-zone/header.json` |
| `dynamic-zone.hero` | `hero.tsx` | `hero.json` |
| `dynamic-zone.features` | `features/index.tsx` | `features.json` |
| `dynamic-zone.testimonials` | `testimonials/index.tsx` | `testimonials.json` |
| `dynamic-zone.how-it-works` | `how-it-works/index.tsx` | `how-it-works.json` |
| `dynamic-zone.brands` | `brands.tsx` | `brands.json` |
| `dynamic-zone.pricing` | `pricing.tsx` | `pricing.json` |
| `dynamic-zone.launches` | `launches.tsx` | `launches.json` |
| `dynamic-zone.cta` | `cta.tsx` | `cta.json` |
| `dynamic-zone.form-next-to-section` | `form-next-to-section.tsx` | `form-next-to-section.json` |
| `dynamic-zone.faq` | `faq.tsx` | `faq.json` |
| `dynamic-zone.related-products` | `related-products.tsx` | `related-products.json` |
| `dynamic-zone.related-articles` | `related-articles.tsx` | `related-articles.json` |

To add a new block: create the Strapi component schema, add it to the relevant content
type's `dynamic_zone.components` array, create the matching React component, and add one
line to `componentMapping` in `manager.tsx`.

`manager.tsx` wraps every entry in `next/dynamic()` for code-splitting (each block gets
its own JS chunk — this matters because several blocks pull in three.js/react-three-fiber
or tsparticles). It intentionally does **not** pass `ssr: false`: these blocks used to be
client-only, which meant every CMS page shipped an empty HTML shell and filled in after
a client-side fetch — a major, non-obvious cause of "slow" page loads. Keep `ssr: false`
off here unless a specific block genuinely cannot render on the server (in which case
push the `dynamic(..., { ssr: false })` down into that block's own heaviest child, the
way `features/skeletons/first.tsx` does for the WebGL globe — not at the manager level).

`app/[locale]/(marketing)/page.tsx` (the homepage) falls back to a hardcoded
`DEFAULT_DYNAMIC_ZONE` when Strapi has no `dynamic_zone` configured for the `homepage`
page slug, so a fresh clone with an empty CMS still renders a complete page instead of a
blank one.

## Fetching & caching

Everything goes through `fetchContentType(contentType, params, spreadData)`
(`lib/strapi/fetchContentType.ts`):

- Outside Strapi's draft-mode preview, requests use `next: { revalidate: 60 }` — Next.js's
  Data Cache, not `cache: "no-store"`. Every dynamic-zone block, the navbar/footer
  (`global`), and every page-level fetch shares this. Reverting to `no-store` here
  reintroduces the "everything refetches from Strapi on every request" slowdown.
- Inside draft mode (`/api/preview`), it forces `cache: "no-store"` so editors always see
  the latest draft.
- Strapi's own `deepPopulate` middleware (`strapi/src/middlewares/deepPopulate.ts`)
  auto-populates relations/media/components/dynamic-zones for any `GET /api/*` request
  that doesn't specify its own `populate` query. This is *why* most `fetchContentType`
  calls in `next-js` don't pass an explicit `populate` param — the server fills it in.
  If a field is unexpectedly missing from a response, check whether the request passed
  its own `populate` (which disables the auto-populate for that request) before assuming
  the middleware is broken.
- `strapiImage(url)` turns a Strapi-relative media path (`/uploads/foo.png`) into an
  absolute URL using `NEXT_PUBLIC_API_URL`. It must stay a plain, cacheable function —
  it used to call `unstable_noStore()`, which forced every server component that rendered
  a CMS image into fully dynamic (uncached) rendering. Don't reintroduce that.
- `next.config.mjs`'s `images.remotePatterns` is derived from `NEXT_PUBLIC_API_URL` at
  build time, so `next/image` can optimize whatever host Strapi actually runs on. If you
  hardcode a hostname here again, images will 400 on any deployment that isn't that host.

## Auth

Auth.js v5 (beta), configured in `next-js/src/auth.ts`:

- Providers: GitHub OAuth, Yandex OAuth, and a Credentials provider (email + bcrypt
  password hash, checked against Drizzle/Postgres).
- Session strategy: JWT (not database sessions).
- `DrizzleAdapter` persists users/accounts to the Postgres database at `DATABASE_URL`
  (see `db/schema/authjs-required-schema.ts`) — again, unrelated to Strapi's database.
- `src/types/next-auth.d.ts` augments `Session["user"]` with the custom fields this
  project adds (`role`, `isOAuth`, `isTwoFactorEnabled`). If you add another custom
  field to the `session`/`jwt` callbacks in `auth.ts`, add it here too or `next build`'s
  type-check will fail on that assignment (`unknown` is not assignable to a concrete type).
- `user-dashboard/page.tsx` is the only route that requires a session; it checks
  server-side with `auth()` and redirects rather than relying on middleware or
  client-side gating. Follow that pattern for any new authenticated page.
- Two-factor auth fields (`isTwoFactorEnabled`, `twoFactorConfirmations` table) exist in
  the schema and are checked in `auth.ts`'s `authorize()`, but there's no UI to enable
  2FA anywhere in the app — it's dormant infrastructure, not a working feature.

## Known gaps (things that look unfinished because they are)

- No seed data ships with the repo (`strapi/package.json`'s `seed` script points at a
  `./data/*.tar.gz` export that doesn't exist). A fresh clone's Strapi instance is
  empty; you populate it through the admin panel (`/admin`) or Strapi's REST/GraphQL API.
- Several Strapi content types (`plan`, `testimonial`, `team-member`, `faq`,
  `faq-slide`, `logo`, `category`) have no direct `fetchContentType("...")` call
  anywhere in `next-js` — they're consumed indirectly, as nested data inside a
  dynamic-zone block's populate result (e.g. `plan` backs `dynamic-zone.pricing`'s
  `plans` prop). Before deleting a content type as "unused", check whether any
  dynamic-zone component's prop shape matches it.
- There's no repository-root CI. `next-js/.github/workflows/lint-test-build.yaml`
  exists but GitHub Actions only reads workflows from `.github/workflows/` at the repo
  root, so it never runs. Either move it to `<repo-root>/.github/workflows/` or treat
  `npm run lint` / `npm run build` (run from inside `next-js/`) as your local CI.

## Running it locally

```bash
# Strapi (CMS) - from strapi/
npm install
npm run develop        # http://localhost:1337, first run prompts you to create an admin user

# next-js (frontend) - from next-js/
npm install
cp .env .env.local      # then fill in DATABASE_URL, AUTH_SECRET, OAuth creds
npx drizzle-kit push    # or apply drizzle/*.sql directly, to create the Auth.js tables
npm run dev             # http://localhost:3000
```

Validate a change before calling it done: `npm run lint` and `npm run build` inside
`next-js/` (the build also type-checks — that's how several of the bugs this document
warns about were actually found).
