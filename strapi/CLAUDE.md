# CLAUDE.md — strapi

CMS-specific guide. Read the repo-root [`CLAUDE.md`](../CLAUDE.md) and
[`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) first.

## Stack

Strapi 5, TypeScript. Content database is sqlite by default
(`config/database.ts`, `DATABASE_CLIENT` env var switches to postgres/mysql). Package
manager is npm.

## Commands

```bash
npm install
npm run develop   # http://localhost:1337 — first run prompts you to create an admin user at /admin
npm run build      # compiles the admin panel
npm run start      # production mode, no autoReload
```

There is no working `npm run seed` — it points at a data export file
(`./data/*.tar.gz`) that isn't in the repo. Populate content through the admin panel or
the REST/GraphQL API instead. If you're asked to add seed data, write a real fixture
file or a one-off script rather than trying to make the `seed` script's referenced
export appear.

## Structure

- `src/api/<name>/` — one directory per content type: `content-types/` (schema),
  `controllers/`, `routes/`, `services/`. Most of this is Strapi's generated
  boilerplate; only touch a controller/service by hand if you need behavior beyond the
  default CRUD.
- `src/components/<category>/*.json` — reusable Strapi components. The
  `dynamic-zone/*.json` ones are what the frontend's `manager.tsx` maps to React
  components — see the table in `docs/ARCHITECTURE.md`. If you add or rename a
  dynamic-zone component here, update that mapping and the matching content type's
  `dynamic_zone.components` array together, or the frontend will silently skip it
  (`manager.tsx` logs a console warning and renders nothing for an unmapped
  `__component`).
- `src/middlewares/deepPopulate.ts` — auto-populates relations/media/dynamic-zones on
  any `GET /api/*` request without its own `populate` query. This is load-bearing: most
  of the frontend's fetches rely on it instead of specifying `populate` themselves.
  Don't remove or narrow it without checking every `fetchContentType()` call in
  `next-js` that omits `populate`.
- `types/generated/*.d.ts` — auto-generated from the schemas above (`strapi
  ts:generate-types`, and automatically on `develop`/`build`). Never hand-edit; if it's
  stale, regenerate instead of patching it.

## Content-type notes

A few content types (`plan`, `testimonial`, `team-member`, `faq`, `faq-slide`, `logo`,
`category`) have no content type-specific fetch in `next-js` — they're populated as
nested data inside a dynamic-zone block (e.g. `plan` backs the `pricing` block's
`plans`). Before deleting a content type as unused, check the dynamic-zone component
prop shapes in `next-js/src/components/dynamic-zone/`, not just for a direct
`fetchContentType("that-name", ...)` call.

## Permissions

New content types default to no public access. To make one readable from `next-js`,
enable `find`/`findOne` for the "Public" role under Settings → Users & Permissions
Plugin → Roles → Public in the admin panel.
