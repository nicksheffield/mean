// ----------------------------------------------------------------------------
// Load config
// ----------------------------------------------------------------------------
var config = require('./config');


// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------
var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var morgan     = require('morgan');
var io         = require('socket.io')(config.socketPort);


// ----------------------------------------------------------------------------
// Express
// ----------------------------------------------------------------------------
var app = express();


// ----------------------------------------------------------------------------
// Middleware
// ----------------------------------------------------------------------------
//app.use(morgan('tiny'));

app.use(express.static(config.clientDir));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));


// ----------------------------------------------------------------------------
// Models
// ----------------------------------------------------------------------------
requireDir(config.modelDir, {
	camelcase: true
});


// ----------------------------------------------------------------------------
// Controllers
// ----------------------------------------------------------------------------
var controllers = requireDir(config.controllerDir, {
	camelcase: true
});

for (var name in controllers) {
	app.use('/api', controllers[name]);
}


// ----------------------------------------------------------------------------
// Events
// ----------------------------------------------------------------------------
var events = requireDir(config.eventDir);


// ----------------------------------------------------------------------------
// Connect to DB
// ----------------------------------------------------------------------------
mongoose.connect(config.db, function(err) {
	if (err) console.log(err);
	
	else console.log('Connected to '+config.db+'!');
});


// ----------------------------------------------------------------------------
// Socket.connect
// ----------------------------------------------------------------------------
io.on('connection', function(socket) {
	console.log('New Socket Connected', socket.id);

	// if there's an error, log it instead of just crashing
	socket.on('error', function(err) {
		console.error(err.stack);
	});

	// load events
	for (var name in events) {
		events[name](io, socket);
	}
});


// ----------------------------------------------------------------------------
// Start server
// ----------------------------------------------------------------------------
app.listen(config.restPort);

console.log(config.name+' running on '+config.domain+':'+config.restPort+'/');


// ----------------------------------------------------------------------------
// Error handler
// ----------------------------------------------------------------------------
process.on('uncaughtException', function(err) {
	console.log(err);
});
