# Stage 1: Pruner
From node:lts-alpine AS pruner

WORKDIR /app

RUN npm i -g turbo 

COPY . .

RUN turbo prune --scope=turborepo-nestjs --docker

# Stage 2: Installer
From node:lts-alpine AS installer

WORKDIR /app

COPY --from=pruner /app/out/json .

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=pruner /app/out/full/turbo.json ./turbo.json

RUN npm i -g pnpm@latest

RUN pnpm install --frozen-lockfile

# Stage 3: Builder
From node:lts-alpine AS builder

WORKDIR /app

COPY --from=installer /app/ .

COPY --from=pruner /app/out/full .

RUN npm i -g pnpm@latest

RUN pnpm run build

# Stage 4: Runner
From node:lts-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/ .

CMD ["node", "apps/turborepo-nestjs/dist/main"]
