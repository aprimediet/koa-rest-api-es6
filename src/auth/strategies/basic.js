'use strict';

import { BasicStrategy } from 'passport-http';
import Client from '../model/client';

export default new BasicStrategy(async(id, secret, done) => {
  try {
    const client = await Client.findOne({ id });
    if (!client || secret !== client.secret) return done(null, false);
    return done(null, client);
  } catch (error) {
    return done(error);
  }
});
