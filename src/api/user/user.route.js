'use strict';

import User from './user.model';

export default (router) => {
  router.get('/users', async(ctx) => {
    ctx.body = await User.find({});
  });
  router.get('/users/:id', async(ctx) => ctx.body = await User.findById(ctx.params.id));
};
