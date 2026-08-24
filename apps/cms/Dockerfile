# Build context must be the repo root (npm workspaces need the root lockfile
# and the sibling apps/web collections aren't needed) — e.g.
# `docker build -f apps/cms/Dockerfile .`
FROM node:22-alpine AS build
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/cms/package.json apps/cms/package.json
COPY packages/cms-types/package.json packages/cms-types/package.json
RUN npm ci
COPY packages/cms-types packages/cms-types
COPY apps/cms apps/cms

# Payload's config is evaluated at build time (route generation, type-checking),
# so a syntactically valid DATABASE_URI/PAYLOAD_SECRET must be present even
# though no real DB connection happens during `next build`. These can be
# throwaway placeholders (unlike apps/web's PAYLOAD_API_KEY) — the running
# container reads its own real values from Coolify's injected env at
# startup, never from anything baked into this build stage.
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI \
	PAYLOAD_SECRET=$PAYLOAD_SECRET

RUN npm run build -w @quintana-fruts/cms

# Next's standalone output mirrors the monorepo path (apps/cms/server.js, not
# server.js at the root) — confirmed by inspecting the actual build output.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=80
COPY --from=build /repo/apps/cms/.next/standalone ./
COPY --from=build /repo/apps/cms/.next/static ./apps/cms/.next/static

# `payload migrate` needs the actual TS source (payload.config.ts + collections/
# globals/migrations it imports) — Payload's CLI loads it via tsx at runtime,
# it isn't part of the Next.js server bundle. Dev mode auto-syncs the schema
# (push); this is the production equivalent, run once on every container start
# so the DB schema is always current before the server starts serving traffic.
COPY --from=build /repo/apps/cms/src ./apps/cms/src
ENV PAYLOAD_CONFIG_PATH=/app/apps/cms/src/payload.config.ts

# Next's standalone tracer only keeps files the running server actually
# imports, which prunes payload/bin.js (the CLI, only ever invoked directly —
# never imported) along with the rest of payload/dist/bin/*. `migrate` needs
# the untraced package, so overlay the full install on top.
COPY --from=build /repo/node_modules ./node_modules

EXPOSE 80
CMD ["sh", "-c", "node node_modules/payload/bin.js migrate && node apps/cms/server.js"]
