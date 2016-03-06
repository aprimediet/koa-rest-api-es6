'use strict';

import _debug from 'debug';

import Client from '../auth/model/client';
import clientFixtures from '../../fixtures/client.json';
import User from '../api/user/user.model';
import userFixtures from '../../fixtures/user.json';
import Image from '../api/image/image.model';
import imageFixtures from '../../fixtures/image.json';

const debug = _debug('krs:db:seed');

export async function seedClients() {
  const client = await Client.findOne();
  if (client) return;
  await Client.find({}).remove();
  debug('--> clients removed');
  await Client.create(clientFixtures);
  debug('--> clients created');
}

export async function seedUsers() {
  const user = await User.findOne();
  if (user) return;
  await User.find({}).remove();
  debug('--> users removed');
  await User.create(userFixtures);
  debug('--> users created');
}

export async function seedImages() {
  const image = await Image.findOne();
  if (image) return;
  await Image.find({}).remove();
  debug('--> images removed');
  await Image.create(imageFixtures);
  debug('--> images created');
}

