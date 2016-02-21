'use strict';

import User from './user.model.js';
import debug from 'debug';

const log = debug('krs:user.route');

export default (router) => {
    router.get('/users', async(ctx) => {
        const users = await User.find({});
        if (users) {
            ctx.body = users;
        }
    });

    router.get('/users/:id', async(ctx) => {
        const user = await User.findById(ctx.params.id);
        if (user) {
            ctx.body = user;
        }
    });

    return router;
};
