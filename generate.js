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

var templates = {
	nController: '/server/templates/ncontroller.js',
	model:       '/server/templates/model.js',
	event:       '/server/templates/event.js',
	aController: '/server/templates/acontroller.js',
	resource:    '/server/templates/resource.js',
	directive:   '/server/templates/directive.js',
	filter:      '/server/templates/filter.js',
	service:     '/server/templates/service.js'
};

console.log(' ');

if(program.nController){
	created.push({
		name: name,
		dir: 'server/controllers/',
		template: templates.nController
	});
}

if(program.model){
	created.push({
		name: name,
		dir: 'server/models/',
		template: templates.model
	});
}

if(program.event){
	created.push({
		name: name,
		dir: 'server/events/',
		template: templates.event
	});
}

if(program.aController){
	created.push({
		name: name+'Ctrl',
		dir: 'client/app/controllers/',
		template: templates.aController
	});
}

if(program.resource){
	created.push({
		name: capitalize(name),
		dir: 'client/app/resources/',
		template: templates.resource
	});
}

if(program.directive){
	created.push({
		name: name,
		dir: 'client/app/directives/',
		template: templates.directive
	});
}

if(program.service){
	created.push({
		name: '$'+name,
		dir: 'client/app/services/',
		template: templates.service
	});
}

if(program.filter){
	created.push({
		name: name,
		dir: 'client/app/filters/',
		template: templates.filter
	});
}



_.each(created, function(newFile){
	console.log("    "+chalk.green('new'), newFile.dir+chalk.red.bold(newFile.name)+'.js');
	
	fs.writeFile(newFile.dir+newFile.name+'.js', _.template(fs.readFileSync(__dirname + newFile.template))(data));

	if(program.sublime){
		exec('sublime "'+newFile.dir+(newFile.name).replace('$', '\\$')+'.js"', function(error, stdout, stderr) {
			// command output is in stdout
		});
	}
	
});


 
function capitalize(str) {
 	var split = str.split('');
 	split[0] = split[0].toUpperCase();
 	return split.join('');
}