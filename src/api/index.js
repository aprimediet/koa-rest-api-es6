'use strict';

import Router from 'koa-router';
import passport from 'koa-passport';
import compose from 'koa-compose';
import _debug from 'debug';

import authRoutes from './auth/auth.route';
import userRoutes from './user/user.route';
import imageRoutes from './image/image.route';

const debug = _debug('krs:api');

export default function () {
  const router = new Router();

  authRoutes(router);
  router.prefix('/api');
  router.use(passport.authenticate('jwt', { session: false }));
  // Routes below this line are only reached if JWT token is valid
  userRoutes(router);
  imageRoutes(router);

  return compose([
    router.routes(),
    router.allowedMethods()
  ]);
}
