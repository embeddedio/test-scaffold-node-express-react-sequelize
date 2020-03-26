'use strict';

module.exports = {    
    db: {
	    name: process.env.DB_NAME || "test",
	    host: process.env.DB_HOST || "localhost",
	    port: process.env.DB_PORT || 5432,
	    username: process.env.DB_USERNAME || "postgres",
	    password: process.env.DB_PASSWORD || "test",
	    dialect: process.env.DB_DIALECT || "postgres", //mysql, postgres, sqlite3,...
	    enableSequelizeLog: process.env.DB_LOG || false,
	    ssl: process.env.DB_SSL || false,
	    sync: process.env.DB_SYNC || true //Synchronizing any model changes with database
	},
    app: {
        title: 'test',
        description: 'test',
        keywords: 'test'
    },
    port: process.env.PORT || 3000,

};