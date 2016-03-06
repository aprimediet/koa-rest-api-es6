'use strict';

import compose from 'koa-compose';
import User from '../api/user/user.model.js';
import * as strategies from './strategies';

export default (passport) => {
  Object.keys(strategies).forEach(name => {
    passport.use(name, strategies[name]);
  });

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async(id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  return compose([
    passport.initialize(),
    passport.session()
  ]);
};
