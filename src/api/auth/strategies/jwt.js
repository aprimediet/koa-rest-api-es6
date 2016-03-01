'use strict';

import config from '../config';
import _debug from 'debug';
import User from '../../user/user.model';
import passportJwt from 'passport-jwt';

const debug = _debug('krs:auth.strategies.jwt');

const opts = {};
opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = config.secret;

export default new passportJwt.Strategy(opts, async(jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

