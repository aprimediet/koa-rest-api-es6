'use strict';

import passport from 'koa-passport';
import User from './user.model.js';
import _debug from 'debug';

const debug = _debug('krs:user.route');

export default (router) => {
  router.get('/users', passport.authenticate('jwt', { session: false }), async(ctx) => {
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
