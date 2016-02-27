'use strict';

import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV !== 'development' });

export default Object.freeze({
  secret: process.env.TOKEN_SECRET || 'secret',
  tokenExpiration: process.env.TOKEN_EXPIRATION || 86400, // 24 hours
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '30d'
});
