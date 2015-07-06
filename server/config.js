module.exports = {

	// name of the application. Used in console logs
	name: 'app',

	// domain name the server is running on, without a trailing slash
	domain: 'http://localhost',

	// port number to run the server on
	port: 8000,
	
	// port number to run the socket server on
	socketPort: 8001,

	// db to connect to. Change the `app` part to the name of your app
	db: 'mongodb://localhost/app',

	// folder holding all the controllers, without a trailing slash
	controllerDir: './controllers',

	// folder holding all the models, without a trailing slash
	modelDir: './models',

	// folder holding all the public files, without a trailing slash
	clientDir: './client',
	
	// folder holding all the socket event files, without a trailing slash
	eventDir: './events',
	
	// folder holding all the module files, without a trailing slash
	moduleDir: './modules'
};
