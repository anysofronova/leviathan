<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

## Features

I create this repo for learning, practicing and understanding how to work NestJS, GraphQL & Prisma together. Project also how to build a clean architecture scalable & testable.

Project inspired from [Nestjs-prisma-starter](https://github.com/fivethree-team/nestjs-prisma-starter) of [fivethree-team](https://github.com/fivethree-team).

## Prerequisites

If you want to develop project only on your local, your need have:

- [NodeJS](https://nodejs.org/en/download/): I use NodeJS lts version (14.15.1)
- npm or yarn: [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) recommend
- [@prisma/cli](https://www.prisma.io/docs/concepts/components/prisma-cli/installation)
- [PostgreSQL](https://www.postgresql.org/download/)
- [PgAdmin(optional)](https://www.pgadmin.org/download/): UI tool to manage database from PostgreSQL

If you don't want to install all these tools, you can check the [docker solution](#docker) below.

## Getting started

### Installation

- Clone project from this repository
- Create and update `.env` file for variables environment

  ```bash
  $ cp .env.example .env
  ```

  Then modify the variables as you want.

  Example of `.env` files:

  ```env
  SERVER_PORT=1776
  DB_CONNECTOR=postgres
  DB_HOST=postgres
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_DATABASE=nest_graphql
  DB_PORT=5432

  DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public
  ```

- Install dependencies
  ```bash
  $ yarn
  # or npm install
  ```
- Generate prisma schema
  Make sure you generate prisma schema before run server:

  ```bash
  $ yarn prisma generate
  ```

  Check [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) for more details how `prisma generate works`

- Run server locally
  ```bash
  $ yarn start:dev
  # or npm run start:dev
  ```

### Command lines

Other useful commands to work with project:

- Run production
  ```bash
  $ yarn start:prod
  ```
- Run testing:
  ```bash
  $ yarn test # for running the the Unit $ integration testing
  $ yarn test:e2e  # for running end to end testing
  ```
- Prisma migrate
  [Prisma migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) is an imperative database schema migration tool that enables you to make changes to your database schema.

  Migrate auto your schema:

  ```bash
  $ yarn prisma migrate dev --preview-feature
  ```

  Migrate with the name schema:

  ```bash
  $ yarn prisma migrate dev --name initDb --preview-feature
  ```

  When we run `prisma generate` or `prisma migrate`, `prisma/cli` will try connect with your database first. So you need to connect successfully with your database through your variable `DATABASE_URL` given in `prisma.schema`:

  For example, you have configuration in your `prisma.schema` like below:

  ```prisma
  // prisma.schema
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```

  So you need to provide this value in `.env` file:

  ```
  DB_HOST=postgres
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_DATABASE=db
  DB_PORT=5432
  DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"

  ```

  Check more information at [Prisma migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

- Seeding database(optional)

  ```bash
  $ yarn seed
  ```

- Prisma studio
  A Visual Interface for Your Database
  [Prisma Studio](https://www.prisma.io/blog/prisma-studio-3rtf78dg99fe) helps developers manage their application data. We're excited to share that it is now part of the stable Prisma release. Try out the [online demo](https://prisma.studio/) or connect it to your existing database.

  So with Prisma studio, you maybe don't need **pgAdmin** anymore.
  <div align="center">
    <img src="docs/img/prisma-studio.png" alt="prisma-studio"/>
  </div>

  Ton run Prisma studio:

  ```bash
  $ yarn prisma:studio
  # or npx prisma studio
  # or yarn prisma studio
  ```

  Then check out at http://localhost:1776

You can check more other commands in section `scripts` of `package.json`.

## Project structure

### Tree project

<details>
<summary>Click to expand sections</summary>

```tree
.
├── docker
│   ├── Dockerfile
│   ├── Dockerfile-prod
│   └── nginx
│       ├── Dockerfile-nginx
│       └── nginx.conf
├── docker-compose.production.yml
├── docker-compose.test.yml
├── docker-compose.yml
├── jest.config.js
├── LICENSE
├── nest-cli.json
├── package.json
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── README.md
├── src
│   ├── app
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.resolver.ts
│   │   ├── app.service.ts
│   ├── common
│   │   ├── abstract-model
│   │   ├── configs
│   │   │   ├── category
│   │   │   ├── post
│   │   │   ├── prisma
│   │   │   ├── profile
│   │   │   └── user
│   │   └── types
│   │       └── node.d.ts
│   ├── main.ts
│   ├── modules
│   │   ├── category
│   │   ├── email
│   │   ├── post
│   │   ├── prisma
│   │   ├── profile
│   │   └── user
│
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

```

</details>

## Docker

To start working with **Docker**, you need have [Docker](https://docs.docker.com/engine/install/) installed locally and also the package manage as **npm** ro **yarn**

In the **development** mode, we have already **PostgreSQL** and **PgAdmin4** in our `docker-compose` file. You can use the same values environment in your `.env` like before.

### Command line

I think all of you know already how to run docker with `docker-compose`:
We have some simple commands:

```bash
$ docker-compose build # Build all services in docker-compose.yaml file
$ docker-compose up # Run all services in docker-compose.yaml
$ docker-compose down # Stop all services
$ docker-compose up nest-api # Run only a  service
```

But that is not the think I want to say here, we need work with docker like we work locally as `prisma generate`, `prisma migration`, seeding, run test ...
In that case how it work?

Well we will run directly docker-compose file for our service `nest-api` and with `yarn` or `npm` we use as when we work locally.

```
$ docker-compose -f docker-compose.yml run --rm api yarn prisma:generate
```

- `-f`: file --> using with the name `docker-compose.***.yml` file
- `--rm`: flag to stop automatically docker service after executing.
- `nest-api`: name service of our server (specify in docker-compose file)
- `yarn prisma:generate`: command that we want to execute

But if you always write command like that, it will be take a lot of time and difficult to remember. So we will prepare theme in section `scripts` of `package.json`.

**Scripts of package.json**

```json
{
  "script": {
    "docker:build": "docker-compose -f docker-compose.yaml build --no-cache",
    "docker:prisma:generate": "docker-compose -f docker-compose.yaml run --rm nest-api yarn prisma:generate",
    "docker:migrate": "docker-compose -f docker-compose.yaml run --rm nest-api yarn migrate:dev",
    "docker:seed": "docker-compose -f docker-compose.yaml run --rm nest-api yarn seed",
    "docker:prisma:studio": "docker-compose -f docker-compose.yaml run nest-api -d yarn prisma:studio",
    "docker:start:dev": "docker-compose up",
    "docker:test:seed": "docker-compose -f docker-compose.test.yml run --rm nest-api yarn seed",
    "docker:test:migrate": "docker-compose -f docker-compose.test.yml run --rm nest-api yarn migrate:dev",
    "docker:test:build": "docker-compose -f docker-compose.test.yml build --no-cache",
    "docker:test:run": "docker-compose -f docker-compose.test.yml run --rm nest-api yarn test"
  }
}
```
