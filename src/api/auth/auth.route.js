'use strict';

import _debug from 'debug';
import { token } from './oauth2';

const debug = _debug('krs:auth.route');

export default (router) => {
  router.post('/auth/token', token());
  return router;
};
