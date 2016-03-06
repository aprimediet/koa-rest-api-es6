'use strict';

export default Object.freeze({
    // MongoDB settings
  dbURI: `mongodb://${process.env.MONGO_HOST || process.env.MONGO_PORT_27017_TCP_ADDR
  || 'localhost'}:27017/${process.env.MONGO_DB_NAME || 'kra-db'}`,
  dbOptions: { user: '', pass: '' }
});
