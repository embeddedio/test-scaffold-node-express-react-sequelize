'use strict';


const   path    = require('path'),
        core    = require(path.resolve('./app/controllers/core.controller')),
        users   = require(path.resolve('./app/controllers/users.controller'));

module.exports = function(app) {
	
	app.route('/test')
        .get(users.hasAuthorization(['ROLE_USER','ROLE_ADMIN']),core.test)
       
        app.route('/test2')
        .get(core.test)

	
};
