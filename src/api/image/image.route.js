'use strict';

import Image from './image.model';
import _debug from 'debug';

const debug = _debug('krs:user.route');

export default (router) => {
  router.get('/images', async(ctx) => {
    const images = await Image.find({});
    if (images) {
      ctx.body = images;
    }
  });
};
