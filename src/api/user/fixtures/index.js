'use strict';

import User from '../user.model';
import userFixtures from './user.json';
import _debug from 'debug';
const debug = _debug('krs:user:fixture');

export default async() => {
  const user = await User.findOne();
  if (user) return;
  await User.find({}).remove();
  debug('--> users removed');
  await User.create(userFixtures);
  debug('--> users created');
};
