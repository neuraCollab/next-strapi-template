# CLAUDE.md — next-js

Frontend-specific guide. Read the repo-root [`CLAUDE.md`](../CLAUDE.md) and
[`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) first — this file only covers what's
specific to working inside `next-js/`.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind, Auth.js v5 (beta) + Drizzle/Postgres,
`next-themes` for dark mode, and a small hand-rolled locale-routing middleware
(`middleware.ts`, using `@formatjs/intl-localematcher` + `negotiator` — not the
`next-intl` package). Package manager is npm.

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build         # also type-checks the whole project - run this before calling a change done
npm run lint
npm run test          # jest --watch
npm run test:ci
npx drizzle-kit push  # apply the Auth.js schema (db/schema/authjs-required-schema.ts) to Postgres
```

Requires `.env.local` (copy `.env` and fill in real values — see `docs/ARCHITECTURE.md`
for what each app needs) and a reachable Strapi instance at `NEXT_PUBLIC_API_URL` for
anything that renders CMS content.

## Conventions

- **Routing**: everything lives under `app/[locale]/`. `(marketing)` is a route group
  (no URL segment) for the public site; `auth/` and `user-dashboard/` sit outside it.
  Every route renders through `app/[locale]/layout.tsx`, which owns the document shell
  — see rule #1 in the repo-root `CLAUDE.md` before adding another layout.
- **Data fetching**: use `fetchContentType()` from `lib/strapi/fetchContentType.ts` for
  anything from Strapi. It already handles draft-mode bypass and caching — don't
  hand-roll a `fetch()` to the Strapi API elsewhere.
- **Images**: CMS media goes through `strapiImage()` (`lib/strapi/strapiImage.ts`) into
  `next/image`, never a raw `<img>` with a hand-built URL.
- **Styling**: Tailwind utility classes; the marketing site is intentionally dark-only
  (hardcoded `bg-charcoal`/`text-white` etc., not `dark:` variants) — that's the design,
  not an oversight. Areas that *do* need to support both themes (currently just
  `user-dashboard` and the shadcn-style components in `components/ui/`) use `dark:`
  variants against the CSS custom properties in `app/style.css`.
- **Two `Button` components exist on purpose** — see the repo-root `CLAUDE.md`. Check
  which one a file already imports before adding a new usage.
- **Auth-gated pages**: check the session server-side with `auth()` from `@/auth` and
  `redirect()` if absent (see `user-dashboard/page.tsx`). Don't rely on client-side
  redirects or `middleware.ts` for this — the middleware only handles locale routing.
- **`any` types are common** in CMS-facing code (Strapi response shapes, dynamic-zone
  props) and that's an accepted tradeoff for this codebase, not something to "fix" by
  itself. Don't do a drive-by pass tightening these unless the task is specifically
  about the type in question.

## Testing

Jest + `next/jest` + jsdom. Test files are colocated as `*.test.ts(x)` next to the code
they cover (e.g. `lib/utils.test.ts`). There's no component-testing convention
established beyond that — follow the existing pattern for the file you're touching
rather than introducing a new one.
