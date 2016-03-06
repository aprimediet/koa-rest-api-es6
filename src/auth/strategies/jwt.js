'use strict';

import config from '../config';
import User from '../../api/user/user.model';
import passportJwt from 'passport-jwt';

const opts = {};
opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = config.secret;

export default new passportJwt.Strategy(opts, async(jwt_payload, done) => { // eslint-disable-line
  try {
    const user = await User.findById(jwt_payload.id);
    if (!user) return done(null, false);
    return done(null, user, { scope: '*' });
  } catch (error) {
    return done(error);
  }
});
