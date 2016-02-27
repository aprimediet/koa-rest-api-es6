'use strict';

import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import session from 'koa-generic-session';
import koaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import sourceMapSupport from 'source-map-support';

import pkg from './package.json';
import routing from './src/api/user/user.route';
import config from './src/config/index';
import _debug from 'debug';
import _log from './src/utils/logger';
import auth from './src/api/auth';
import { connectDb, seedDb } from './src/db';

sourceMapSupport.install();

const debug = _debug('krs:server');
const log = _log(module);

const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author.name}
*
*********************************************************************************************`;

const initServer = () => {
  log.debug(banner);

  const app = new Koa();
  app.keys = ['secret'];

  app.use(koaLogger());
  app.use(convert(cors()));
  app.use(convert(bodyParser()));
  app.use(convert(session()));
  app.use(auth());

  const router = routing(koaRouter());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(ctx => ctx.status = 404);

  (async() => {
    try {
      const info = await connectDb();
      log.info(`Connected to ${info.host}:${info.port}/${info.name}`);
    } catch (ex) {
      debug('Unable to connect to database %s', ex);
    }
    try {
      await seedDb();
    } catch (ex) {
      debug('Unable to connect to seed users %s', ex);
    }

    // Start up the server on the port specified in the config after we connected to mongodb
    app.listen(config.server.port, () => {
      log.debug(`App started on port ${config.server.port} with environment ${config.environment}`);
    });
  })();
};

export default initServer();
