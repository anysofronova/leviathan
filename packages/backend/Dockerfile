# Build stage
FROM node:lts as build

WORKDIR /app

COPY package*.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn run build

# Production stage
FROM node:lts-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
COPY --from=build /app/dist ./dist

RUN yarn install --frozen-lockfile --production=true

EXPOSE 4200

CMD ["node", "dist/main.js"]