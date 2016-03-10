'use strict';

import User from './user.model';

/**
 * Set user routes.
 *
 * @param {Object} router - the route object ( instance of Koa Router )
 */
export default (router) => {
  /**
   * List of users.
   *
   * @param {Object} ctx The context object
   * @returns {Array} the list of users
   * @api public
   */
  router.get('/users', async(ctx) => ctx.body = await User.find({}));

  /**
   * Find an user by id.
   *
   * @param {Object} ctx The context object
   * @returns {Object} the user corresponding to the specified id
   * @api public
   */
  router.get('/users/:id', async(ctx) => ctx.body = await User.findById(ctx.params.id));
};
