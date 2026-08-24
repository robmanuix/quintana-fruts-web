# Build context must be the repo root (npm workspaces need the root lockfile
# and packages/cms-types), not apps/web — e.g. `docker build -f apps/web/Dockerfile .`
FROM node:22-alpine AS build
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/cms-types/package.json packages/cms-types/package.json
RUN npm ci
COPY packages/cms-types packages/cms-types
COPY apps/web apps/web

# Astro fetches all content from Payload at build time — these must be real,
# reachable values (the production Payload service + its API key), not dev
# placeholders, or the build fails (by design: no content, no ship).
# NOTE: PAYLOAD_API_KEY is a real credential and ends up in this layer's build
# history (`docker history`), not just the running container — acceptable only
# because this image is never pushed to a public registry. If that changes,
# switch to a BuildKit `--secret` mount instead of ARG/ENV.
ARG PAYLOAD_REST_URL
ARG PAYLOAD_SERVER_URL
ARG PAYLOAD_API_KEY
ENV PAYLOAD_REST_URL=$PAYLOAD_REST_URL \
	PAYLOAD_SERVER_URL=$PAYLOAD_SERVER_URL \
	PAYLOAD_API_KEY=$PAYLOAD_API_KEY

RUN npm run build -w @quintana-fruts/web

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /repo/apps/web/dist ./dist
COPY --from=build /repo/apps/web/package.json ./package.json
COPY --from=build /repo/node_modules ./node_modules
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
