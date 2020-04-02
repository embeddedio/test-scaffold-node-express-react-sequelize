'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/user.authentication.controller'),
	require('./users/user.authorization.controller')/*,
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')*/
);
