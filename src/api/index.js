'use strict';

import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import auth from './auth';
import { token } from './auth/oauth2';
import userRoutes from './user/user.route';
import imageRoutes from './image/image.route';

const app = new Koa();
app.use(auth(passport));

const router = new Router({
  prefix: '/api'
});

router.post('/auth/token', token());

userRoutes(router);
imageRoutes(router);

app.use(router.routes());

export default app;
