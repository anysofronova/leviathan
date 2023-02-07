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

# Background

Named after [Peter Naur](https://en.wikipedia.org/wiki/Peter_Naur), datalogy founder

[shields-fsd-image]: https://img.shields.io/badge/Feature--Sliced-Design-FFF?logoWidth=32&style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADJSURBVHgB7dfhCYMwEAXgd8UBHKHdoCOkI3SEblInaUfoCO0GbtCMkA3i5YeQH2I8OHIB/UAEeaiYx0koMhg6wVjHh8eeEVfgD0O0+xKaS0vwEuQHIvLQFGUclDUxiG6C/AhlqQNPGDrmQOrAA4Y61BV4jnzyC7U74PkFLvmFJjowoJ6AhRf4YruRP2FYC/CK9ny6zg/k/PrwijIOBSmT5Ys/uiY68Bbkw4aMz+75Q/OijIOyY2NiTroxuRcHi1BagrMg30OZeQknPcrQWNgGlSgAAAAASUVORK5CYII=
