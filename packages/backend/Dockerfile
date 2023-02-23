FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy app source and build
COPY . .
RUN yarn run build

# App server
FROM node:16
ENV NODE_ENV production

# Copy built files from the builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Set port
EXPOSE 4200

# Run app
CMD [ "yarn", "run", "start:prod" ]