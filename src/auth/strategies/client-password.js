'use strict';

import { Strategy } from 'passport-oauth2-client-password';
import Client from '../model/client';

export default new Strategy(async(id, secret, done) => {
  try {
    const client = await Client.findOne({ id });
    if (!client || secret !== client.secret) return done(null, false);
    return done(null, client);
  } catch (error) {
    return done(error);
  }
});
