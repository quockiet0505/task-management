FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lockb* bun.lock* ./

RUN bun install

COPY . .

RUN bun run build

FROM node:20-alpine

RUN apk update && apk upgrade --no-cache

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["bun","run","start"]