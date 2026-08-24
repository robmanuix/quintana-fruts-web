# Quintana Früts — Landing Page + CMS

Sitio comercial de Quintana Früts (exportadora de frutas exóticas de Ecuador), construido con [Astro](https://astro.build), animaciones [GSAP](https://gsap.com) y [Payload CMS](https://payloadcms.com) como backend de contenido.

Monorepo (npm workspaces):

- `apps/web` — el sitio Astro público. Lee contenido de Payload en build time (sitio 100% estático).
- `apps/cms` — Payload CMS (app Next.js: panel de administración + API REST/GraphQL).
- `packages/cms-types` — tipos TypeScript generados por Payload, compartidos por `apps/web`.

## Stack

- **AstroJS** — sitio estático (SSG), adapter `@astrojs/node`.
- **GSAP + ScrollTrigger** — animaciones de scroll.
- **Payload CMS** (Next.js + PostgreSQL + almacenamiento S3-compatible) — contenido editable.
- Fuentes vía `@fontsource` (Ibarra Real Nova, Poppins, Urbanist).

## Desarrollo local

```sh
npm install                  # instala dependencias de todo el monorepo (raíz)
docker compose up -d         # Postgres + MinIO locales, usados por apps/cms
```

| Comando                | Acción                                                  |
| :---------------------- | :------------------------------------------------------- |
| `npm run dev:web`        | Levanta el sitio Astro en `localhost:4321`               |
| `npm run dev:cms`        | Levanta Payload/Next.js en `localhost:3000` (`/admin`)   |
| `npm run build:web`      | Genera el build de producción del sitio en `apps/web/dist/` |
| `npm run generate:types` | Regenera `packages/cms-types` a partir del esquema de Payload |

## Despliegue

Coolify (VPS en Hostinger) gestiona `apps/web`, `apps/cms` y Postgres como recursos separados. Publicar contenido en Payload dispara un webhook que reconstruye y redespliega `apps/web`; cada `push` a `main` también dispara un redeploy vía webhook de GitHub.

- Producción: https://quintanafruts.com
- CMS: https://cms.quintanafruts.com/admin

`PLAN-landing-page.md` documenta una arquitectura headless con WordPress evaluada antes de decidirse por Payload — se conserva solo como referencia histórica, no describe el estado actual.
