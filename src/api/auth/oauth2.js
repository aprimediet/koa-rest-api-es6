'use strict';

import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import oauth2orize from 'oauth2orize-koa';
import compose from 'koa-compose';
import Client from '../client/client.model';
import User from '../user/user.model';
import logger from '../../utils/logger';
import debugModule from 'debug';
import config from './config';

const debug = debugModule('krs:auth.oauth2');
const log = logger(module);

const server = oauth2orize.createServer();

server.serializeClient(client => client._id);
server.deserializeClient(async(id) => await Client.findById(id));

server.exchange(oauth2orize.exchange.password(async(client, email, password) => {
    if (!client.trusted) return false;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return false;

    try {
        const isMatch = await user.comparePassword(password);
        debug('comparePassword --> %s', isMatch);
        if (isMatch) {
            debug('config.token.secret: %s', config.secret);

            const token = jwt.sign({ id: user._id, email: user.email },
                config.secret, { expiresIn: config.expiration });

            return token;
        }
    } catch (err) {
        return log.error(err);
    }

    return false;
}));

export function token() {
    return compose([
        passport.authenticate('client-basic', { session: false }),
        async(ctx, next) => {
            ctx.state.user = ctx.passport.user;
            await next();
        },
        server.token(),
        server.errorHandler()
    ]);
}
