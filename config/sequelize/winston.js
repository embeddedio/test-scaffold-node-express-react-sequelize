"use strict";

/**
 * Created by Junaid Anwar on 5/28/15.
 */
const   winston = require('winston');

let logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.json(),
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false
});
logger.add(new winston.transports.Console({
  format: winston.format.simple()
}));
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;