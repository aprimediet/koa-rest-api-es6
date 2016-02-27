'use strict';

import Image from '../image.model';
import imageFixtures from './image.json';
import debug from 'debug';
const log = debug('krs:image:fixture');

export default () => {
  (async() => {
      await Image.find({}).remove();
      log('--> images removed');
      await Image.create(imageFixtures);
      log('--> images created');
    })();
};
