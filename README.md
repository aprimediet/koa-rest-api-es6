KOA 2 REST API Boilerplate
==================================

A simple Koa 2 rest api app that implement oauth2 password owner flow with JSON Web Token and Refresh Token.

Koa app and mongo db dockerized with docker-compose.

**Note: This project is under development.**

## Features
  * Koa 2 ( async/await replace generator functions) : <https://github.com/koajs/koa/tree/v2.x>
  * Simple oAuth2 password flow implementation with oauth2orize : <https://github.com/jaredhanson/oauth2orize/>
  * Docker and Docker-compose
  * ES6 support via [babel](https://babeljs.io)
  * ES6 modules ( transpiled with babel )
  * Moongoose.js (for MongoDB interaction): <http://mongoosejs.com/>
  * JSON Web Token ([JWT](http://jwt.io)) authentication

## Install

  ```bash
  $ git clone https://github.com/ddellamico/koa-rest-api-es6
  ```
  On OS X and Windows you'll need to install **vagrant**: <https://www.vagrantup.com/docs/installation/>

  After that, in the project directory, run :

  ```bash
  $ vagrant up
  ```
  After vm is started, run `vagrant ssh` and  finally
  run `docker-compose up` in the project dir to create and start the container.

  The app should then be running on your docker daemon on port **3000**.

  **NOTE:** [dotenv](https://github.com/motdotla/dotenv) is used to manage environment variables from a `.env` file.
  Place in root project a `.env` file and "overwrite" the default values. ES:

```bash
  NODE_PORT=3000
  NODE_ENV=development
  MONGO_DB_NAME=your-mongo-db-name
  TOKEN_SECRET=secret
```
