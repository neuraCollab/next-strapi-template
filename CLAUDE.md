# CLAUDE.md

Operating guide for AI agents working in this repo. Read this before making changes;
read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) before touching routing, the Strapi
integration, or auth — it explains the *why* behind the rules below.

## What this is

A two-app starter: `next-js/` (Next.js 14 App Router frontend, Auth.js, Drizzle+Postgres
for user accounts) driven by `strapi/` (headless CMS) over its REST API. Pages are built
from a Strapi "dynamic zone" — an ordered list of CMS-configured blocks — so most content
changes belong in Strapi content, not in React code. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full map, including the
component-mapping table for the dynamic-zone system.

Each subproject also has its own `CLAUDE.md` (`next-js/CLAUDE.md`, `strapi/CLAUDE.md`)
with more specific conventions. If you're only working inside one of them, read that one
too.

## Before you start

- Almost all application code is in `next-js/`; `strapi/` is mostly CMS schema
  (content types, components) plus one custom middleware
  (`strapi/src/middlewares/deepPopulate.ts`).
- There are **two separate databases**: Strapi's own content database (sqlite by
  default) and a Postgres database that only holds Auth.js user/session data
  (`next-js/src/db`). Don't assume a `strapi` API call and a `db` query touch the same
  store.
- Content editing (copy, images, pricing, FAQs, ...) happens in the Strapi admin panel
  or via its API, not by hardcoding text into React components. If you're asked to
  "change the FAQ text" or similar, check whether it's CMS-driven (most marketing
  content is) before editing a component.

## Ground rules learned the hard way

These aren't style preferences — each one was a real, shipped bug:

1. **Only `next-js/src/app/[locale]/layout.tsx` renders `<html>`/`<body>`.** The root
   `app/layout.tsx` must stay a plain pass-through (providers only). Nesting document
   shells produces invalid markup that browsers silently "fix" by reordering the DOM.
2. **`next-themes`' `ThemeProvider` must be a direct child of `<body>`**, not an
   ancestor of the `<html>` element — it injects a script that assumes that position.
   It lives in `[locale]/layout.tsx`, inside the `<body>`.
3. **Don't add `cache: "no-store"` or `unstable_noStore()` to the Strapi fetch path**
   (`lib/strapi/fetchContentType.ts`, `lib/strapi/strapiImage.ts`) outside of draft-mode
   preview. Every page fetches through these; forcing them dynamic makes the whole site
   slow. Use the existing `revalidate: 60` pattern.
4. **Don't add `ssr: false` to the top-level dynamic-zone component map**
   (`components/dynamic-zone/manager.tsx`). That was the previous state and it meant
   every CMS page shipped an empty shell that only filled in client-side. If one
   specific block's dependency truly can't run on the server (WebGL, etc.), push
   `dynamic(..., { ssr: false })` down into that one child component instead — see
   `features/skeletons/first.tsx` for the pattern.
5. **`next.config.mjs`'s image `remotePatterns` is derived from `NEXT_PUBLIC_API_URL`.**
   Don't hardcode a hostname (e.g. `localhost`) there — it breaks `next/image` for any
   deployment pointed at a different Strapi host.
6. **Two components named `Button` exist on purpose**: `components/elements/button.tsx`
   (the plain, always-dark marketing-site button) and `components/ui/Button.tsx` (a
   shadcn-style, theme-aware `cva` button used by the few components that support
   light/dark, like the navbar's theme toggle and dropdown menus). Match whichever one
   the surrounding code already uses; don't merge them.
7. **If you add a custom field to the Auth.js `session`/`jwt` callbacks in `auth.ts`**,
   add it to `src/types/next-auth.d.ts` too, or `next build`'s type-check fails (`token.x`
   is typed `unknown` by default; `session.user` has no index signature).

## Workflow

- Package manager is **npm** in both subprojects (there's no pnpm/yarn lockfile;
  don't introduce one).
- Before considering a `next-js` change done: `npm run lint` and `npm run build` from
  inside `next-js/`. The build also type-checks the whole project — several real bugs
  (broken auth types, a dependency's type export changing) were only caught this way,
  not by `next dev`.
- `strapi/types/generated/*.d.ts` are auto-generated (`strapi ts:generate-types`, or
  automatically on `strapi develop`/`strapi build`). Don't hand-edit them; if a Strapi
  content-type schema changes, regenerate instead.
- No repo-root CI runs today (see the "no CI" gap in `docs/ARCHITECTURE.md`) — treat the
  local lint/build commands as the check.
- Don't invent seed content or claim a CMS content type "isn't used" without first
  checking whether a dynamic-zone component's prop shape matches it (several content
  types are only ever consumed indirectly, nested inside a dynamic-zone populate
  result — see `docs/ARCHITECTURE.md`'s "Known gaps" section).

## Where things live (quick index)

| I want to... | Look at |
|---|---|
| Change navbar/footer links or site name | Strapi `global` single type (`navbar`/`footer` fields) |
| Add/edit a homepage or CMS-page section | Strapi `page.dynamic_zone`, matching component in `components/dynamic-zone/` |
| Change auth providers or session shape | `next-js/src/auth.ts` + `src/types/next-auth.d.ts` |
| Change what happens after login | `next-js/src/app/[locale]/user-dashboard/` |
| Change how Strapi data is fetched/cached | `next-js/src/lib/strapi/fetchContentType.ts` |
| Add a new locale | `next-js/src/i18n.config.ts`, then localize content in Strapi |
| Add a DB column for user accounts | `next-js/src/db/schema/authjs-required-schema.ts` + `drizzle-kit` migration |
