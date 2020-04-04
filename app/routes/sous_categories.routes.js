'use strict';


const   path            = require('path'),
        sousCategories  = require(path.resolve('./app/controllers/sous_categories.controller')),
        users           = require(path.resolve('./app/controllers/users.controller'));

module.exports = function(app) {
	
    app.route('/api/sous_categories')
    .get(sousCategories.list)
    .post((users.hasAuthorization(['ROLE_ADMIN']),sousCategories.create));

   /* app.route('/api/sous_categories/:evenementId')
        .get(users.hasAuthorization(['ROLE_SUPER_ROOT','ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PROGRAMMER']),categories.read)
        .put(users.hasAuthorization(['ROLE_SUPER_ROOT','ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PROGRAMMER']),categories.update)
        .delete(users.hasAuthorization(['ROLE_SUPER_ROOT','ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PROGRAMMER']),categories.delete);     
    */
	
};
