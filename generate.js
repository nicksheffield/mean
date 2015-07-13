#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

var program = require('commander');
var _ = require('lodash');
var chalk = require('chalk');


program
	.version('0.0.1')
	.usage('[options] <name>')
	.option('-n, --n-controller', 'make an Express controller')
	.option('-m, --model', 'make a Mongoose model')
	.option('-e, --event', 'make a Socket.io event')
	.option('-a, --a-controller', 'make an Angular controller')
	.option('-r, --resource', 'make an Angular resource')
	.option('-d, --directive', 'make an Angular directive')
	.option('-f, --filter', 'make an Angular filter')
	.option('-s, --service', 'make an Angular service')
	.option('-o, --sublime', 'open newly created files in sublime')
	.parse(process.argv);

var name = String(program.args[0]).toLowerCase();

var data = {
	name: name,
	capitalizedName: capitalize(name)
};

var created = [];

console.log(' ');

if(program.nController){
	var nControllerTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/ncontroller.js'));
	fs.writeFile(__dirname + '/server/controllers/'+name+'.js', nControllerTemplate(data));
	
	created.push({
		name: name,
		dir: 'server/controllers/'
	});
}

if(program.model){
	var modelTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/model.js'));
	fs.writeFile(__dirname + '/server/models/'+name+'.js', modelTemplate(data));
	
	created.push({
		name: name,
		dir: 'server/models/'
	});
}

if(program.event){
	var eventTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/event.js'));
	fs.writeFile(__dirname + '/server/events/'+name+'.js', eventTemplate(data));
	
	created.push({
		name: name,
		dir: 'server/events/'
	});
}

if(program.aController){
	var aControllerTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/acontroller.js'));
	fs.writeFile(__dirname + '/client/app/controllers/'+name+'Ctrl.js', aControllerTemplate(data));
	
	created.push({
		name: name+'Ctrl',
		dir: 'client/app/controllers/'
	});
}

if(program.resource){
	var resourceTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/resource.js'));
	fs.writeFile(__dirname + '/client/app/resources/'+capitalize(name)+'.js', resourceTemplate(data));
	
	created.push({
		name: capitalize(name),
		dir: 'client/app/resources/'
	});
}

if(program.directive){
	var directiveTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/directive.js'));
	fs.writeFile(__dirname + '/client/app/directives/'+name+'.js', directiveTemplate(data));
	
	created.push({
		name: name,
		dir: 'client/app/directives/'
	});
}

if(program.service){
	var serviceTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/service.js'));
	fs.writeFile(__dirname + '/client/app/services/$'+name+'.js', serviceTemplate(data));
	
	created.push({
		name: '$'+name,
		dir: 'client/app/services/'
	});
}

if(program.filter){
	var filterTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/filter.js'));
	fs.writeFile(__dirname + '/client/app/filters/'+name+'.js', filterTemplate(data));
	
	created.push({
		name: name,
		dir: 'client/app/filters/'
	});
}



_.each(created, function(newFile){
	console.log("    "+chalk.green('new'), newFile.dir+chalk.red.bold(newFile.name)+'.js');

	if(program.sublime){
		exec('sublime '+newFile.dir+newFile.name+'.js', function(error, stdout, stderr) {
			// command output is in stdout
		});
	}
	
});


 
function capitalize(str) {
 	var split = str.split('');
 	split[0] = split[0].toUpperCase();
 	return split.join('');
}