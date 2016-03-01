'use strict';

export default Object.freeze({
    // MongoDB settings
  dbURI: `mongodb://${process.env.MONGO_HOST || 'localhost'}:27017/${process.env.MONGO_DB_NAME || 'kra-db'}`,
  dbOptions: { 'user': '', 'pass': '' }
});
