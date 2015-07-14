var config = {};

// name of the application. Used in console logs, and database connection
config.name = 'test';

// domain name the server is running on, without a trailing slash
config.domain = 'http://localhost';

// port number to run the express server on. Also hard coded in /client/app/services/$config.js
config.restPort = 8000;

// port number to run the socket server on.  Also hard coded in /client/app/services/$config.js
config.socketPort = 8001;

// db to connect to
config.db = 'mongodb://localhost/'+config.name;

// folder holding all the controllers, without a trailing slash
config.controllerDir = './controllers';

// folder holding all the models, without a trailing slash
config.modelDir = './models';

// folder holding all the public files, without a trailing slash
config.clientDir = './client';

// folder holding all the socket event files, without a trailing slash
config.eventDir = './events';

// folder holding all the module files, without a trailing slash
config.moduleDir = './modules';

module.exports = config;