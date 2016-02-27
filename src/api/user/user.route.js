'use strict';

import User from './user.model.js';
import _debug from 'debug';
import { token } from '../auth/oauth2';

const debug = _debug('krs:user.route');

export default (router) => {

  router.post('/auth/token', token());

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
