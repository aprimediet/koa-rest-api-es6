'use strict';

import Boom from 'boom';
import mongoose from 'mongoose';
import _debug from 'debug';

const debug = _debug('krs:route-constraints:objectId');

/**
 * A check to see if id is a valid ObjectId or not
 * @returns {Function}
 */
export function objectIdConstraint() {
  return async(ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
      debug('Invalid ObjectId ==> %s', ctx.params.id);
      throw Boom.notFound('The requested resource was not found.');
    }
    await next();
  };
}
