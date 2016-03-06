'use strict';

import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import oauth2orize from 'oauth2orize-koa';
import compose from 'koa-compose';
import uuid from 'node-uuid';
import User from '../api/user/user.model.js';
import RefreshToken from './model/refresh-token';
import logger from '../utils/logger';
import _debug from 'debug';
import config from './config';

const debug = _debug('krs:auth.oauth2');
const log = logger(module);

const server = oauth2orize.createServer();

/**
 * Creates jwt token and refresh token
 *
 * @param {Object} user - The user object
 * @param {String} user._id - The user id
 * @param {String} user.email - The user email
 * @param {Object} client - The client object
 * @param {String} client._id - The client id
 */
async function generateTokens(user, client) {
  if (!user || !client) return false;

  const jwtToken = jwt.sign({ id: user._id, email: user.email },
    config.secret, { expiresIn: parseInt(config.tokenExpiration, 10) });

  await RefreshToken.findOneAndRemove({ user: user._id });

  const refreshTokenVal = uuid.v4();
  await RefreshToken.create({
    token: refreshTokenVal,
    user: user._id,
    client: client._id
  });

  return [jwtToken, refreshTokenVal, { expires_in: config.tokenExpiration }];
}

/**
 * Exchange username & password for access token.
 */
server.exchange(oauth2orize.exchange.password(async(client, email, password, scope) => {
  if (!client.trusted) return false;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return false;
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return false;
    debug('Valid credentials. current scope --> %s', scope);
    return await generateTokens(user, client);
  } catch (err) {
    log.error(err);
  }
  return false;
}));

/**
 * Exchange refreshToken for access token.
 */
server.exchange(oauth2orize.exchange.refreshToken(async(client, refreshToken, scope) => {
  if (!client.trusted) return false;

  const refreshTokenHash = RefreshToken.encryptToken(refreshToken);

  try {
    const refToken = await RefreshToken.findOne({ token: refreshTokenHash, client: client._id });
    if (!refToken) {
      debug('Refresh token not found');
      return false;
    }

    debug('Refresh token found. Current scope --> %s', scope);
    const user = await User.findById(refToken.user);

    if (!user) {
      debug('User not found --> %s', refToken.user);
      return false;
    }

    return await generateTokens(user, client);
  } catch (err) {
    log.error(err);
  }
  return false;
}));

/**
 *`token` middleware handles client requests to exchange authorization grants
 * for jwt tokens.  Based on the grant type being exchanged, the above
 * exchange middleware will be invoked to handle the request.  Clients must
 * authenticate when making requests to this endpoint.
 * @returns {Object} The token middleware
 */
export function token() {
  return compose([
    passport.authenticate(['basic', 'clientPassword'], { session: false }),
    async(ctx, next) => {
      ctx.state.user = ctx.passport.user;
      await next();
    },
    server.token(),
    server.errorHandler()
  ]);
}
