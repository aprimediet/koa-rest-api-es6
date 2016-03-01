'use strict';

import _log from '../utils/logger';
import _debug from 'debug';

const debug = _debug('krs:handle-error');
const log = _log(module);

export default function () {
  return async(ctx, next) => {
    try {
      await next();
    } catch (err) {
      log.error(err);
      ctx.body = {
        message: err.message,
        stack: err.stack,
        options: err
      };
      ctx.status = err.status || 500;
    }
  };
}
