'use strict';
/**
 * Module dependencies.
 */


const 	path 	= require("path"),
		chalk 	= require('chalk'),
		config	= require('./config/config'),
		db 		= require('./config/sequelize/sequelize-connect');
		




// Init the express application
const app = require('./config/express')(db);

app.get('server').listen(config.port);

exports = module.exports = app;

// Logging initialization
console.log('APP application started on port 3000');

