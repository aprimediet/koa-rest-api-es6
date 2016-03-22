'use strict';

import Image from './image.model';
import { authorize } from '../auth/oauth2';
import { objectIdConstraint } from '../../middleware/route-constraints';

/**
 * Set image routes.
 *
 * @param {Object} router - the route object ( instance of Koa Router )
 */
export default (router) => {
  // Routes below this line are only reached if JWT token is valid
  router.use(authorize());

  /**
   * List of images.
   *
   * @param {Object} ctx The context object
   * @returns {Image[]} Return user list
   */
  router.get('/images', async(ctx) => ctx.body = await Image.find({}));

  /**
   * Find an image by id.
   *
   * @param {Object} ctx The context object
   * @returns {Image} the image corresponding to the specified id
   */
  router.get('/images/:id', objectIdConstraint(),
    async(ctx) => ctx.body = await Image.findById(ctx.params.id));

  /**
   * Find images for a specific user id.
   *
   * @param {Object} ctx The context object
   * @returns {Image} the image corresponding to the specified id
   */
  router.get('/users/:id/images', objectIdConstraint(),
    async(ctx) => ctx.body = await Image.find({ user: ctx.params.id }));
};
