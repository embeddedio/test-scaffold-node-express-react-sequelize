'use strict';

const core = require('../controllers/core.controller');

module.exports = function(app) {
	
	app.route('/')
		.get(core.index)		
	
};
