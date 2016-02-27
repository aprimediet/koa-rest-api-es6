'use strict';

import User from '../user.model';
import userFixtures from './user.json';
import debug from 'debug';
const log = debug('krs:user:fixture');

export default () => {
  (async() => {
    await User.find({}).remove();
    log('--> users removed');
    await User.create(userFixtures);
    log('--> users created');
  })();
};
