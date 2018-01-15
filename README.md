# storytold

> The chapters of our life, the stories we tell

<br />

## Table of Contents

* [The Software Stack][section-the-software-stack]
* [Dev Prerequisites][section-dev-prerequisites]
* [Dev Install][section-dev-install]
* [Dev Run][section-dev-run]
* [Dev Lint][section-dev-lint]
* [Dev Test][section-dev-test]


## The Software Stack

Node Isomorphic: Persistence (relational DB) + API Server + CMS + Isomorphic UI (server & client)
> Core build and SSR setup taken from [Evan You's][link-evan-you-github] - [Hacker News Vue + SSR Example][link-vue-hackernews-site] (thanks!)

<br />

| Layer | Implementation |
| ----- | -------------- |
| Language | JavaScript ES6 |
| Module Bundler | Webpack (w/ dev hot reload) |
| Authentication | Local Accounts + Google OAuth2, Express-Session |
| Core UI Framework | Vue + Vue BundleRenderer (for SSR) |
| UI Component/Style Framework | Vuetify (based on Material Design) |
| State Management | Vuex |
| Server Router | Vue-Router (for UI), Express (for client data API & Auth) |
| Data Layer/ORM | Joint-Kit + Bookshelf/Knex |
| Client API | Joint-Kit + Express |
| Persistence | Remote Postgres (dev/prod) + Embedded Sqlite3 (test) |
| Localization | I18N (hand-rolled) |
| Core Utilities | Lodash, Moment, Request-Promise/Bluebird |
| Linting | ESLint (airbnb) |
| Testing | Mocha/Chai/Chai-HTTP (unit + functional) |


## Dev Prerequisites

To develop the system locally, you need:

* a [Postgres][link-postgres-site] database server running on localhost, port 5432
* a Postgres user with superuser privileges (for creating a database)
* npm
* git


## Dev Install

(1) Clone the repo into your local dev environment.

(2) Create the local database for development:
> If your superuser does not have a password, you can omit the <code>superpassword</code> flag

``` sh
$ superuser=<your_db_superuser> superpassword=<your_superuser_password> npm run db-init
```

(3) Install the db schema for the app:

``` sh
$ npm run migrate:latest
```

(4) Seed the database with system provided data (optional):

Data Sets:
* system
* demo

``` sh
$ npm run seed:<data_set>
```

You can reset the database completely and execute all seeds in a single command:

``` sh
$ npm run migrate:reset-demo
```


## Dev Run

[TBC]

``` sh
$ npm run dev
```


## Dev Lint

The app uses [ESLint][link-eslint-site] for source code linting. The linting will run automatically on `git commit`.

[TBC]

``` sh
$ npm run lint
```


## Dev Test

The app uses [Mocha][link-mocha-site] for the testing framework,
and [Chai][link-chai-site] and [Chai-HTTP][link-chai-http-site] for its assertions.

[TBC]

``` sh
$ npm run test
```


[section-the-software-stack]: #the-software-stack
[section-dev-prerequisites]: #dev-prerequisites
[section-dev-install]: #dev-install
[section-dev-run]: #dev-run
[section-dev-lint]: #dev-lint
[section-dev-test]: #dev-test

[link-evan-you-github]: https://github.com/yyx990803
[link-vue-hackernews-site]: https://github.com/vuejs/vue-hackernews-2.0
[link-postgres-site]: https://www.postgresql.org
[link-eslint-site]: https://eslint.org
[link-mocha-site]: https://mochajs.org
[link-chai-site]: http://chaijs.com
[link-chai-http-site]: http://chaijs.com/plugins/chai-http
