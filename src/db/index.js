'use strict';

import mongoose from 'mongoose';
import mongoConfig from './config';
import _debug from 'debug';
import logger from '../utils/logger';
import userFixtures from '../api/user/fixtures';
import imageFixtures from '../api/image/fixtures';
import clientFixture from '../api/client/fixtures';

const debug = _debug('krs:db');
const log = logger(module);

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.debug('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

export function connectDb() {
  return new Promise((resolve, reject) => {
    // create the database connection
    mongoose.connect(mongoConfig.dbURI, mongoConfig.dbOptions);

    mongoose.connection
      .on('error', (err) => {
        debug('Mongoose connection error: %s', err);
        reject(err);
      })
      .on('close', (err) => debug('Mongoose connection error %', err))
      .once('open', () => resolve(mongoose.connections[0]))
      .on('connected', () => {
        debug('Mongoose connected to %s', mongoConfig.dbURI);
      });
  });
}

export async function seedDb() {
  await userFixtures();
  await imageFixtures();
  await clientFixture();
}
