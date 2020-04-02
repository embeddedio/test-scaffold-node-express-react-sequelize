'use strict';

const   path    = require('path'),
        users   = require(path.resolve('./app/controllers/users.controller'));

module.exports = function(app) {
	// User Routes
	

	// Setting up the users password api
	//app.route('/api/security/auth/forgot').post(users.forgot);
	//app.route('/api/security/auth/reset/:token').get(users.validateResetToken);
	//app.route('/api/security/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/api/security/auth/signup').post(users.signup);
	app.route('/api/security/auth/signin').post(users.signin);
	app.route('/api/security/auth/signout').post(users.signout);

	// Finish by binding the user middleware
	//app.param('userId', users.userByID);

};
