'use strict';

import Image from '../image.model';
import imageFixtures from './image.json';
import _debug from 'debug';
const debug = _debug('krs:image:fixture');

export default async() => {
  const image = await Image.findOne();
  if (image) return;
  await Image.find({}).remove();
  debug('--> images removed');
  await Image.create(imageFixtures);
  debug('--> images created');
};
