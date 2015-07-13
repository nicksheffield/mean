#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');

program
	.version('0.0.1')
	.usage('[options] <name>')
	.option('-c, --n-controller', 'Make a Node controller')
	.option('-m, --model', 'Make a Mongoose model')
	.option('-e, --event', 'Make a Socket.io event')
	.option('-C, --a-controller', 'Make an Angular controller')
	.option('-r, --resource', 'Make an Angular resource')
	.option('-d, --directive', 'Make an Angular directive')
	.option('-f, --filter', 'Make an Angular filter')
	.option('-s, --service', 'Make an Angular service')
	.parse(process.argv);

var name = String(program.args[0]).toLowerCase();

var data = {
	name: name,
	capitalizedName: capitalize(name)
};

console.log(' ');

if(program.nController){
	var nControllerTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/ncontroller.js'));
	fs.writeFile(__dirname + '/server/controllers/'+name+'.js', nControllerTemplate(data));
	
	console.log("    "+chalk.green('new'), '/server/controllers/'+chalk.red.bold(name)+'.js');
}

if(program.model){
	var modelTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/model.js'));
	fs.writeFile(__dirname + '/server/models/'+name+'.js', modelTemplate(data));
	
	console.log("    "+chalk.green('new'), '/server/models/'+chalk.red.bold(name)+'.js');
}

if(program.model){
	var eventTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/event.js'));
	fs.writeFile(__dirname + '/server/events/'+name+'.js', eventTemplate(data));
	
	console.log("    "+chalk.green('new'), '/server/models/'+chalk.red.bold(name)+'.js');
}

if(program.aController){
	var aControllerTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/acontroller.js'));
	fs.writeFile(__dirname + '/client/app/controllers/'+name+'Ctrl.js', aControllerTemplate(data));
	
	console.log("    "+chalk.green('new'), '/client/app/controllers/'+chalk.red.bold(name)+'Ctrl.js');
}

if(program.resource){
	var resourceTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/resource.js'));
	fs.writeFile(__dirname + '/client/app/resources/'+capitalize(name)+'.js', resourceTemplate(data));
	
	console.log("    "+chalk.green('new'), '/client/app/resources/'+chalk.red.bold(capitalize(name))+'.js');
}

if(program.directive){
	var directiveTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/directive.js'));
	fs.writeFile(__dirname + '/client/app/directives/'+name+'.js', directiveTemplate(data));
	
	console.log("    "+chalk.green('new'), '/client/app/directives/'+chalk.red.bold(name)+'.js');
}

if(program.service){
	var serviceTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/service.js'));
	fs.writeFile(__dirname + '/client/app/services/$'+name+'.js', serviceTemplate(data));
	
	console.log("    "+chalk.green('new'), '/client/app/services/$'+chalk.red.bold(name)+'.js');
}

if(program.filter){
	var filterTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/filter.js'));
	fs.writeFile(__dirname + '/client/app/filters/'+name+'.js', filterTemplate(data));
	
	console.log("    "+chalk.green('new'), '/client/app/filters/'+chalk.red.bold(name)+'.js');
}


 
function capitalize(str) {
 	var split = str.split('');
 	split[0] = split[0].toUpperCase();
 	return split.join('');
}