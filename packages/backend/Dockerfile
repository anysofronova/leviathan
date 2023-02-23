# Build stage
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./prisma/ /app/
RUN apk --no-cache add --virtual .gyp python3 make g++ && \
    yarn install --production=false --frozen-lockfile && \
    yarn cache clean && \
    apk del .gyp
COPY . .
RUN yarn run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY package*.json .eslintrc.* ./
COPY --from=build /app/dist ./dist
RUN yarn install --production=true --frozen-lockfile --no-cache && \
    apk add --no-cache tini
EXPOSE 4200
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["yarn", "run", "start:prod"]