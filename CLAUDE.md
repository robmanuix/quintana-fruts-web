## Development

This is an npm-workspaces monorepo:

- `apps/web` — the Astro site (public-facing, reads content from Payload at build time).
- `apps/cms` — Payload CMS (Next.js app; admin panel + REST/GraphQL API).
- `packages/cms-types` — Payload's generated TypeScript types, committed so `apps/web` can import them without needing DB/S3 credentials.

Run installs from the repo root (`npm install`), not inside individual apps.

To start the Astro dev server, use background mode from `apps/web`:

```
cd apps/web && astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs` (run from `apps/web`).

For Payload CMS locally: start Postgres + MinIO with `docker compose up -d` (repo root), copy `apps/cms/.env.example` to `apps/cms/.env`, then `npm run dev:cms` from the repo root. Admin panel: `http://localhost:3000/admin`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
