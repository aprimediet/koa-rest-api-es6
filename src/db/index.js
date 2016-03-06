'use strict';

import mongoose from 'mongoose';
import mongoConfig from './config';
import _debug from 'debug';
import { seedClients, seedUsers, seedImages } from './seed';

const debug = _debug('krs:db');

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

export function connectDb() {
  return new Promise((resolve, reject) => {
    // create the database connection
    mongoose.connect(mongoConfig.dbURI, mongoConfig.dbOptions);

    mongoose.connection
      .on('error', (err) => {
        debug('Mongoose connection error: %s', err.message);
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
  await seedClients();
  await seedUsers();
  await seedImages();
}
