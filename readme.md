# Leviathan

Admin panel for your admin solutions

[![Feature-Sliced Design][shields-fsd-image]](https://feature-sliced.design/)

# Tech stack

Next.js
Nest.js
Docker
Docker-compose
Jest
Cypress
...

# Getting started

# Backend

> DON'T commit .env files into version control, add `.env` to `.gitignore`. `.env` files are added here as an example.

Develop the Nest application

```bash
cd packages/backend

yarn install

cp .env.example .env

yarn run prisma:generate

yarn run start:dev
```

## Docker File

Get started by running

```bash
yarn run docker:backend
```

## Docker Compose

```bash
docker-compose up
# or detached
docker-compose up -d
```

# Frontend

Develop the Next application

```bash
cd packages/frontend

yarn install

cp .env.example .env

yarn run dev
```

## Docker File

Get started by running

```bash
yarn run docker:backend
```

## Docker Compose

```bash
docker-compose up
# or detached
docker-compose up -d
```
