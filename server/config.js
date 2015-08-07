module.exports = {

	// name of the application. Used in console logs, and database connection
	name: 'Test',
	
	// either development or production. This setting decides what options set below will be used
	environment: 'development',
	
	development: {
		// domain name the server is running on, without a trailing slash
		domain: 'http://localhost',

		// port number to run the express server on. Also hard coded in /client/app/services/$config.js
		restPort: 8000,

		// port number to run the socket server on.  Also hard coded in /client/app/services/$config.js
		socketPort: 8001,

		// db to connect to
		db: 'mongodb://localhost/test'
	},
	
	production: {
		// domain name the server is running on, without a trailing slash
		domain: 'http://localhost',

		// port number to run the express server on. Also hard coded in /client/app/services/$config.js
		restPort: 8000,

		// port number to run the socket server on.  Also hard coded in /client/app/services/$config.js
		socketPort: 8001,

		// db to connect to
		db: 'mongodb://localhost/test'
	},

	// folder holding all the controllers, without a trailing slash
	controllerDir: './controllers',

	// folder holding all the models, without a trailing slash
	modelDir: './models',

	// folder holding all the public files, without a trailing slash
	clientDir: './public',

	// folder holding all the socket event files, without a trailing slash
	eventDir: './events',

	// folder holding all the module files, without a trailing slash
	moduleDir: './modules'

};