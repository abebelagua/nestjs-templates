## Stage 1 (production build)
FROM node:22.10.0-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

## Stage 2 (production runner)
FROM node:22.10.0-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/dist                   ./dist
COPY --from=builder /app/package.json           ./package.json

RUN yarn install --production

CMD ["yarn", "prod"]
