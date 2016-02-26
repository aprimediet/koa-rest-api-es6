'use strict';

import passport from 'koa-passport';
import compose from 'koa-compose';
import User from '../user/user.model';
import basicStrategy from './strategies/client-basic';
import debug from 'debug';

const log = debug('krs:auth');

passport.use('client-basic', basicStrategy);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
    log('deserializeUser');
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

