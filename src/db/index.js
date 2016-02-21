'use strict';

import mongoose from 'mongoose';
import User from '../api/user/user.model';
import Image from '../api/image/image.model';
import { mongodb, users, images } from './config';
import debug from 'debug';

const log = debug('krs:db');

export function connectDb() {
    return new Promise((resolve, reject) => {
        // create the database connection
        mongoose.connect(mongodb.dbURI, mongodb.dbOptions);

        mongoose.connection
            .on('error', (err) => {
                log('Mongoose connection error: %s', err);
                reject(err);
            })
            .on('close', (err) => log('Mongoose connection error %', err))
            .once('open', () => resolve(mongoose.connections[0]))
            .on('connected', () => {
                log('Mongoose connected to %s', mongodb.dbURI);
            });
    });
}

export async function seedUsers() {
    await User.find({}).remove();
    log('users removed');
    await User.create(users);
    log('users created');
}

export async function seedImages() {
    await Image.find({}).remove();
    log('images removed');
    await Image.create(images);
    log('images created');
}

