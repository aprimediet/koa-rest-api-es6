'use strict';

import Koa from 'koa';
import passport from 'koa-passport';
import auth from './passport';
import { token } from './oauth2';
import Router from 'koa-router';

const app = new Koa();
const router = new Router({
  prefix: '/auth'
});

router.post('/token', token());

app.use(auth(passport));
app.use(router.routes());

export default app;

export function authorize() {
  return passport.authenticate('jwt', { session: false });
}
