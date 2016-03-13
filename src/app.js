'use strict';

import 'dotenv/config';
import Koa from 'koa';
import Promise from 'bluebird';
import sourceMapSupport from 'source-map-support';
import pkg from '../package.json';
import logger from 'koa-logger';
import middleware from './middleware';
import mount from 'koa-mount';
import api from './api';
import config from './config';
import _log from './utils/logger';
import { connectDb, seedDb } from './db';

sourceMapSupport.install();

const log = _log(module);

const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author.name}
*
*********************************************************************************************`;

log.debug(banner);

// loud rejection
Promise.onPossiblyUnhandledRejection(log.error);

const app = new Koa();
if (config.environment === 'development') {
  app.use(logger());
}
app.use(middleware());
app.use(mount(api));

(async() => {
  try {
    const info = await connectDb();
    log.debug(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (ex) {
    log.error('Unable to connect to database %s', ex);
  }
  try {
    await seedDb();
  } catch (ex) {
    log.error('Unable to seed users %s', ex);
  }
  app.listen(config.server.port, () => {
    log.debug(`App started on port ${config.server.port} with environment ${config.environment}`);
  });
})();

export default app;
