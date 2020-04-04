'use strict';


const   path        = require('path'),
        categories  = require(path.resolve('./app/controllers/categories.controller')),
        users       = require(path.resolve('./app/controllers/users.controller'));

module.exports = function(app) {
	
    app.route('/api/categories')
    .get(categories.list)
    .post((users.hasAuthorization(['ROLE_ADMIN']),categories.create));

   /* app.route('/api/categories/:evenementId')
        .get(users.hasAuthorization(['ROLE_SUPER_ROOT','ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PROGRAMMER']),categories.read)
        .put(users.hasAuthorization(['ROLE_SUPER_ROOT','ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PROGRAMMER']),categories.update)
        .delete(users.hasAuthorization(['ROLE_SUPER_ROOT','ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PROGRAMMER']),categories.delete);     
    */
	
};
