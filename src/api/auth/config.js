'use strict';

import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV !== 'development' });

export default Object.freeze({
    secret: process.env.TOKEN_SECRET || 'secret',
    expiration: process.env.TOKEN_EXPIRATION || 86400 //24 hours
});
