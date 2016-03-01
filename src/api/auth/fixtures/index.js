'use strict';

import Client from '../model/client';
import clientFixtures from './client.json';
import _debug from 'debug';
const debug = _debug('krs:client:fixture');

export default async() => {
  const client = await Client.findOne();
  if (client) return;
  await Client.find({}).remove();
  debug('--> clients removed');
  await Client.create(clientFixtures);
  debug('--> clients created');
};
