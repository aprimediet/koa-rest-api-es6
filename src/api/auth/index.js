'use strict';

import passport from 'koa-passport';
import compose from 'koa-compose';
import User from '../user/user.model';
import * as strategies from './strategies';
import _debug from 'debug';

const debug = _debug('krs:auth');

Object.keys(strategies).forEach(name => {
  passport.use(name, strategies[name]);
});

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  (async() => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

export default () => {
  return compose([
    passport.initialize(),
    passport.session()
  ]);
};

