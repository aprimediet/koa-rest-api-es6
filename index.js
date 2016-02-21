'use strict';

import Koa from 'koa';
import koaRouter from 'koa-router';
import logger from 'koa-logger';
import routing from './src/api/user/user.route';
import config from './src/config/index';
import pkg from './package.json';
import debug from 'debug';
import { connectDb, seedUsers, seedImages } from './src/db';

const log = debug('krs:server');

const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author.name}
*
*********************************************************************************************`;

const initServer = () => {
    console.log(banner);

    const router = routing(koaRouter());
    const app = new Koa();

    app.use(logger());
    app.use(router.routes());
    app.use(router.allowedMethods());

    (async() => {
        try {
            const info = await connectDb();
            log(`Connected to ${info.host}:${info.port}/${info.name}`);
        } catch (ex) {
            log('Unable to connect to database %s', ex);
        }
        try {
            await seedUsers();
        } catch (ex) {
            log('Unable to connect to seed users %s', ex);
        }

        try {
            await seedImages();
        } catch (ex) {
            log('Unable to connect to seed images %s', ex);
        }

        // Start up the server on the port specified in the config after we connected to mongodb
        app.listen(config.server.port, () => {
            log(`App started on port ${config.server.port} with environment ${config.environment}`);
        });

    })();
};

export default initServer();
