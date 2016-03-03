'use strict';

import Koa from 'koa';
import sourceMapSupport from 'source-map-support';
import pkg from './package.json';
import logger from 'koa-logger';
import middleware from './src/middleware';
import routing from './src/api';
import config from './src/config';
import _debug from 'debug';
import _log from './src/utils/logger';
import auth from './src/api/auth';
import { connectDb, seedDb } from './src/db';
import 'dotenv/config';

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

log.debug(banner);

const app = new Koa();

if (config.environment === 'development') {
  app.use(logger());
}
app.use(middleware());
app.use(auth());
app.use(routing());

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


export default app;
