"use strict";

const   fs          = require('fs'),
        path        = require('path'),
        Sequelize   = require('sequelize'),
        _           = require('lodash'),
        config      = require('../config'),
        winston     = require('./winston');

winston.info('Initializing Sequelize...');

let orm     = require('./sequelize');
let models  = [];

/*config.files.server.models.forEach(function(file) {
  models.push(path.resolve(file));
});*/

config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
	console.log(path.resolve(modelPath))
	models.push(path.resolve(modelPath));
});

orm.discover = models;
orm.connect(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  storage: config.db.storage,
  logging: config.db.enableSequelizeLog ? winston.verbose : false,
  dialectOptions: {
    ssl: config.db.ssl ? config.db.ssl : false
  }
});