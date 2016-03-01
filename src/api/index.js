'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';
import _debug from 'debug';

import authRoutes from './auth/auth.route';
import userRoutes from './user/user.route';
import imageRoutes from './image/image.route';

const debug = _debug('krs:api');

export default function () {
  const router = new Router();

  authRoutes(router);
  userRoutes(router);
  imageRoutes(router);

  return compose([
    router.routes(),
    router.allowedMethods()
  ]);
}
