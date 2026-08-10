# Plan: Landing Page Headless (AstroJS + WordPress + GSAP)

## Contexto

Se va a construir una landing page comercial en arquitectura **headless**: WordPress como backend de contenido (CMS) y AstroJS como frontend de presentación, consumiendo el contenido de WP vía API. El diseño UI ya está **aprobado en Figma**, por lo que el frontend debe implementarse fielmente a ese diseño. La landing incluye animaciones (GSAP) y un **formulario de cotización** que debe llegar a WordPress a través de un plugin de formularios (WPForms / Contact Form 7 / Fluent Forms — a definir el específico en fase de setup). Todo el proyecto (WordPress + build/servidor de Astro) se aloja en el **mismo VPS**.

Decisiones ya tomadas con el usuario:
- **Integración del formulario:** vía plugin de formularios de WP, consumiendo su API REST desde Astro (no se construye un endpoint custom).
- **Origen del contenido:** 100% dinámico desde WordPress (hero, servicios/productos, testimonios, etc. se gestionan como contenido/CPTs y se consumen vía WPGraphQL o REST API).
- **Hosting:** un único VPS aloja WordPress y sirve el sitio Astro (build estático servido por Nginx, o Node si se requiere SSR).

Pendiente de definir en la fase de arranque (no bloquea la planificación, pero se marca explícitamente): el link/acceso al archivo de Figma aprobado, y el plugin de formularios específico a usar.

---

## Arquitectura

```
┌─────────────────────┐        WPGraphQL / REST API        ┌──────────────────────┐
│   AstroJS Frontend   │ ─────────────────────────────────▶ │   WordPress Backend   │
│  (SSG en build-time  │                                     │  (headless, sin theme │
│   o SSR si aplica)   │ ◀───────────────────────────────── │   frontal visible)     │
└─────────────────────┘        JSON (contenido, CPTs)        └──────────────────────┘
        │                                                              │
        │  Submit formulario (fetch/axios)                            │
        └───────────── API REST del plugin de formularios ────────────┘
                        (WPForms / CF7 / Fluent Forms)

        Ambos servicios corren en el mismo VPS:
        - Nginx sirve el build estático de Astro (dist/) en el dominio principal
        - WordPress corre en un subdominio/subpath (ej. cms.dominio.com) solo como backend
        - GSAP se ejecuta 100% client-side sobre el HTML generado por Astro
```

**Plugins WordPress necesarios:**
- WPGraphQL (o usar la REST API nativa de WP + ACF to REST API si se usan Advanced Custom Fields para los bloques de contenido del Figma).
- ACF (Advanced Custom Fields) o Custom Post Types UI, para modelar los campos de cada sección de la landing (hero, features, testimonios, CTA, etc.) según lo que dicte el diseño de Figma.
- Plugin de formularios elegido (WPForms/CF7/Fluent Forms) + su addon/API REST para recibir la cotización.
- Desactivar/ocultar el theme frontal de WP (o usar un theme headless mínimo) ya que WP solo sirve de backend.

---

## Fases del desarrollo

### Fase 0 — Descubrimiento y setup (fundacional)
- Obtener acceso al archivo Figma aprobado; extraer design tokens (colores, tipografías, espaciados, breakpoints) usando el MCP de Figma (`get_design_context` / `get_variable_defs`).
- Definir el modelo de contenido: qué secciones de la landing serán CPTs/campos ACF en WP (hero, propuesta de valor, servicios, testimonios, footer, etc.), en base a las secciones visibles en el Figma.
- Elegir y confirmar el plugin de formularios específico.
- Provisionar el VPS: dominio/subdominio para WP headless, dominio principal para Astro, certificados SSL, Nginx.

### Fase 1 — Backend WordPress (headless)
- Instalar WordPress en subdominio (ej. `cms.tudominio.com`).
- Instalar y configurar WPGraphQL (o REST + ACF to REST API).
- Modelar contenido: crear los Custom Post Types / Options Pages / campos ACF necesarios para cada sección de la landing, replicando la estructura del Figma.
- Cargar el contenido real (textos, imágenes) aprobado en el diseño.
- Instalar y configurar el plugin de formulario de cotización (campos según lo definido en Figma: nombre, contacto, producto/servicio, cantidad, mensaje, etc.), habilitar su endpoint API y configurar notificaciones por email al equipo comercial.
- Configurar CORS en WP para permitir peticiones desde el dominio de Astro.
- Endurecer seguridad: ocultar `wp-login` si aplica, restringir REST API solo a los endpoints necesarios, backups automáticos.

### Fase 2 — Setup del proyecto Astro
- Inicializar proyecto AstroJS (`npm create astro@latest`), configurar integración de imágenes, sitemap, y adaptador de salida (`static` para SSG o `node`/similar si se necesita SSR para contenido siempre fresco).
- Configurar cliente de datos: `graphql-request` (o `fetch` nativo) apuntando al endpoint WPGraphQL/REST del VPS.
- Definir estructura de carpetas: `src/components/` (por sección: Hero, Servicios, Testimonios, CTA, FormularioCotizacion, Footer), `src/layouts/`, `src/lib/wp.ts` (cliente API), `src/styles/tokens.css` (design tokens extraídos de Figma).
- Instalar GSAP (`gsap` + plugins necesarios como `ScrollTrigger`) como dependencia del frontend.

### Fase 3 — Maquetación fiel al Figma
- Traducir cada sección del Figma a componentes `.astro`, usando el flujo de diseño-a-código (skill `figma-design-to-code`) para asegurar fidelidad de espaciados, tipografías y breakpoints.
- Conectar cada componente al contenido dinámico de WP (props alimentados desde el fetch en build-time o server-side).
- Asegurar responsive (mobile-first) según los breakpoints definidos en Figma.

### Fase 4 — Animaciones GSAP
- Implementar animaciones de entrada (scroll reveal con `ScrollTrigger`), micro-interacciones en botones/CTA, y transiciones entre secciones, siguiendo el detalle de motion si el Figma lo especifica (o criterio de diseño estándar si no).
- Usar la skill `hyperframes-animation` como referencia de patrones GSAP (easing, stagger, timelines) para mantener coherencia y performance.
- Cuidar performance: lazy-load de GSAP solo en las secciones que lo necesitan, `prefers-reduced-motion` para accesibilidad.

### Fase 5 — Formulario de cotización
- Construir el componente de formulario en Astro (validación cliente: campos requeridos, formato de email/teléfono).
- Integrar el submit contra la API REST del plugin de formularios de WP (fetch POST con manejo de loading/success/error states).
- Feedback visual al usuario (mensaje de éxito, manejo de errores de red/validación del servidor).
- Protección anti-spam (honeypot y/o reCAPTCHA/hCaptcha, según lo soporte el plugin elegido).

### Fase 6 — QA y optimización
- Revisar pixel-perfect contra Figma (breakpoints mobile/tablet/desktop).
- Auditoría de performance (Lighthouse: LCP, CLS por animaciones, peso de imágenes — usar `astro:assets` para optimización automática).
- Accesibilidad (contraste, foco de teclado en el formulario, `aria-live` en mensajes de éxito/error).
- SEO básico: meta tags, Open Graph, sitemap.xml, datos estructurados si aplica.
- Pruebas del formulario end-to-end: envío real, verificación de que la cotización llega a WP/email.

### Fase 7 — Deploy en VPS
- Build de producción de Astro (`astro build`) → carpeta `dist/`.
- Configurar Nginx: servir `dist/` en el dominio principal (o proxy a Node si es SSR), proxy/subdominio para WordPress.
- Configurar CI/CD simple (ej. script de deploy vía SSH/rsync, o GitHub Actions si el repo está en GitHub) para futuras actualizaciones de contenido/código.
- SSL (Let's Encrypt) para ambos dominios/subdominios.
- Configurar caché (Nginx/Cloudflare) para el sitio estático.

### Fase 8 — Post-lanzamiento
- Documentar cómo el equipo de marketing edita contenido en WP (guía rápida de los CPTs/campos ACF).
- Definir proceso de rebuild del sitio Astro cuando cambie el contenido en WP (webhook de WP → trigger de rebuild, si se usa SSG; no aplica si es SSR).
- Monitoreo: uptime del VPS, logs de errores del formulario, analítica (GA4/Plausible).

---

## Verificación end-to-end
- Confirmar que cada sección de la landing renderiza el contenido real proveniente de WP (no datos hardcodeados) tras publicar/editar en WP.
- Enviar el formulario de cotización de prueba y verificar que la entrada llega al backend de WP (panel del plugin) y dispara la notificación configurada.
- Ejecutar Lighthouse (mobile y desktop) y validar que las animaciones GSAP no degraden CLS/LCP.
- Revisar visualmente cada breakpoint contra el diseño de Figma (comparación lado a lado).
- Probar el sitio con JavaScript deshabilitado parcialmente para confirmar que el contenido base (no animado) sigue siendo legible/funcional.
