# Build stage
FROM node:lts as build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile --production=false && yarn cache clean --force

COPY . .

RUN yarn run build

# Prisma stage
FROM node:lts-alpine as prisma

WORKDIR /app

COPY prisma ./prisma

RUN yarn install --frozen-lockfile  \
    && yarn run prisma:generate \
    && yarn run migrate:deploy

# Production stage
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=prisma /app/node_modules ./node_modules
COPY --from=prisma /app/prisma ./prisma

RUN yarn install --frozen-lockfile --production=true

EXPOSE 4200

CMD ["yarn", "run", "start:prod"]
