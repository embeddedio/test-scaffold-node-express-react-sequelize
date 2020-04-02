'use strict';

/**
 * Module dependencies.
 */


 
const 	fs 				= require('fs'),
		http 			= require('http'),
		https 			= require('https'),
		express 		= require('express'),
		bodyParser 		= require('body-parser'),
		morgan 			= require('morgan'),
		session 		= require('express-session'),
		compress 		= require('compression'),
		methodOverride 	= require('method-override'),
		cookieParser 	= require('cookie-parser'),
		helmet 			= require('helmet'),
		passport 		= require('passport'),
		flash 			= require('connect-flash'),
		config 			= require('./config'),
		path 			= require('path'),
		cors 			= require('cors'),
		jwt 			= require('jsonwebtoken'),
		User 			= require(path.resolve('./app/controllers/users.controller')),
		socketio 		= require('socket.io');


 






module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {		
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});



	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);
	
	// Set swig as the template engine
	app.set('view engine', 'html');

	// Environment dependent middleware
	if (config.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else {
		app.locals.cache = 'memory';
	}


	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(cors());

	app.use(function (req, res, next) {

		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept, x-xsrf-token');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	});

	


	app.use(async (req, res, next) => {
		if (req.headers["x-access-token"]) {		
			try {
				let accessToken = req.headers["x-access-token"];
					accessToken = config.decryptToken(accessToken);

				const { userId,userRole, exp } = await jwt.verify(accessToken, config.JWT_SECRET);

			} catch(err) {
				return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
			}			
		}
		next();
	});





	// CookieParser should be above session
	app.use(cookieParser());

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	//app.use(helmet.xframe());
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.ieNoOpen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {

		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});



	// Attach Socket.io
	var server = http.createServer(app);
	var io = socketio.listen(server);
	app.set('socketio', io);
	app.set('server', server);

	// Return Express server instance

	return app;

};

