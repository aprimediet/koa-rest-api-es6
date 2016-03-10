'use strict';

import Router from 'koa-router';
import compose from 'koa-compose';
import { authorize } from '../auth';
import userRoutes from './user/user.route';
import imageRoutes from './image/image.route';

/**
 * Set the app routes.
 * @returns {Function} composed middleware function
 */
export default function () {
  const router = new Router({
    prefix: '/api'
  });

  router.use(authorize());
  // Routes below this line are only reached if JWT token is valid
  userRoutes(router);
  imageRoutes(router);

  return compose([
    router.routes(),
    router.allowedMethods()
  ]);
}
