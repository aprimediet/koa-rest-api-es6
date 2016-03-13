'use strict';

import User from './user.model';
import { authorize } from '../auth/oauth2';
import { objectIdConstraint } from '../../middleware/route-constraints';

// import _debug from 'debug';
// const debug = _debug('krs:api.user.route');

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
   * @returns {User[]} Return user list
   */
  router.get('/users', authorize(), async(ctx) => ctx.body = await User.find({}));

  /**
   * Create new user
   * @param {Object} ctx The context object
   * @returns {User}
   */
  router.post('/users', async(ctx) => {
    const { username, name, lastName, password } = ctx.request.body;

    ctx.body = await User.create({
      username,
      name,
      lastName,
      password
    });

    ctx.status = 201;
  });

  /**
   * Find an user by id.
   *
   * @param {Object} ctx The context object
   * @returns {User} the user corresponding to the specified id
   */
  router.get('/users/:id', authorize(), objectIdConstraint(),
    async(ctx) => ctx.body = await User.findById(ctx.params.id));

  /**
   * Update existing user by id
   * @param {Object} ctx The context object
   */
  router.put('/users/:id', authorize(), objectIdConstraint(), async(ctx) => {
    const { name, lastName, active, phone, website, company } = ctx.request.body;

    const user = await User.findByIdAndUpdate(ctx.params.id, {
      name,
      lastName,
      active,
      phone,
      website,
      company
    }, {
      new: true,
      runValidators: true
    });
    if (user) ctx.body = user;
  });

  /**
   * Delete user by id
   * @param {Object} ctx The context object
   */
  router.delete('/users/:id', authorize(), objectIdConstraint(), async(ctx) => {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (user) ctx.status = 204;
  });
};
