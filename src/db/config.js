'use strict';

import mongoose from 'mongoose';

const testUserId = mongoose.Types.ObjectId('5692820f7822e79322d671e1');

export const mongodb = Object.freeze({
    // MongoDB settings
    dbURI: `mongodb://${process.env.MONGO_HOST || process.env.EXPRESSRESTAPIES6_MONGO_1_PORT_27017_TCP_ADDR ||
    'localhost'}:27017/${process.env.MONGO_DB_NAME || 'kra-db'}`,
    dbOptions: { 'user': '', 'pass': '' }
});

export const users = [{
    _id: testUserId,
    provider: 'local',
    firstName: 'Damien',
    lastName: 'Damien Dell\'Amico',
    email: 'damien.dellamico@gmail.com',
    password: 'test',
    roles: ['user', 'admin'],
    avatar: ''
}, {
    provider: 'local',
    firstName: 'user1',
    lastName: 'lastname1',
    email: 'user1@gmail.com',
    password: 'test',
    roles: ['user']
}];

export const images = [{
    fileName: 'image 1',
    url: 'http://lorempixel.com/400/200/animals/1/',
    user: testUserId
}, {
    fileName: 'image 2',
    url: 'http://lorempixel.com/400/200/animals/2/',
    user: testUserId
}, {
    fileName: 'image 3',
    url: 'http://lorempixel.com/400/200/animals/3/',
    user: testUserId
}];
