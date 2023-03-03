FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile
RUN yarn prisma generate

COPY . ./

CMD ["yarn", "run", "dev"]