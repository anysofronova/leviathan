# Build stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN yarn install --production=false --frozen-lockfile
COPY . .
RUN yarn run build

# Production stage
FROM node:16 as production
ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 4200
CMD [ "yarn", "run", "start:prod" ]