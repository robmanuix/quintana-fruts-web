# Quintana Früts — Landing Page

Sitio comercial de Quintana Früts (exportadora de frutas exóticas de Ecuador), construido con [Astro](https://astro.build) y animaciones [GSAP](https://gsap.com).

## Stack

- **AstroJS** — sitio estático (SSG).
- **GSAP + ScrollTrigger** — animaciones de scroll.
- Fuentes vía `@fontsource` (Ibarra Real Nova, Poppins, Urbanist).

## Desarrollo local

```sh
npm install
npm run dev
```

| Comando           | Acción                                      |
| :----------------- | :------------------------------------------- |
| `npm install`       | Instala dependencias                         |
| `npm run dev`        | Levanta el servidor local en `localhost:4321` |
| `npm run build`      | Genera el build de producción en `./dist/`   |
| `npm run preview`    | Sirve el build de producción localmente      |

## Despliegue

El sitio se despliega automáticamente en [Coolify](https://coolify.io) (VPS en Hostinger) mediante el `Dockerfile` de la raíz (build multi-stage: Node → Nginx sirviendo `dist/`). Cada `push` a `main` dispara un redeploy vía webhook configurado en GitHub.

- Producción: https://quintanafruts.com

Ver `PLAN-landing-page.md` para la arquitectura headless (WordPress) planeada como siguiente fase.
