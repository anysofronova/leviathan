# Install dependencies only when needed
FROM node:lts AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM node:lts AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

SHELL ["/bin/sh", "-c"]

RUN npm i -g npm@latest; \
 npm install -g yarn; \
# pnpm setup; \
# mkdir -p /usr/local/share/pnpm &&\
# export PNPM_HOME="/usr/local/share/pnpm" &&\
# export PATH="$PNPM_HOME:$PATH"; \
# pnpm bin -g &&\
 yarn install --frozen-lockfile

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:lts AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 leviathan-frontend

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=platform:nodejs /app/.next/standalone ./
COPY --from=builder --chown=platform:nodejs /app/.next/static ./.next/static

USER leviathan-frontend

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
