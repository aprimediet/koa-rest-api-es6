'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import session from 'koa-generic-session';
import handleError from './handle-error';

export default function () {
  return compose([
    helmet(),
    convert(cors()),
    convert(bodyParser()),
    convert(methodOverride()),
    convert(session()),
    handleError()
  ]);
}
