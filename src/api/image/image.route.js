'use strict';

import Image from './image.model';

export default (router) => {
  router.get('/images', async(ctx) => ctx.body = await Image.find({}));
};
