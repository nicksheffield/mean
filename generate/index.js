#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

var cmd = require('commander');
var _ = require('lodash');
var chalk = require('chalk');

cmd
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

var name = String(cmd.args[0]).toLowerCase();

var data = {
	name: name,
	capitalizedName: capitalize(name)
};

var f = []; // an array of the files to create

var tpl = {
	nController: '/templates/ncontroller.js',
	model:       '/templates/model.js',
	event:       '/templates/event.js',
	aController: '/templates/acontroller.js',
	resource:    '/templates/resource.js',
	directive:   '/templates/directive.js',
	filter:      '/templates/filter.js',
	service:     '/templates/service.js'
};


if(cmd.nController) f.push({ name: name,             dir: 'server/controllers/',     template: tpl.nController });
if(cmd.model)       f.push({ name: name,             dir: 'server/models/',          template: tpl.model });
if(cmd.event)       f.push({ name: name,             dir: 'server/events/',          template: tpl.event });
if(cmd.aController) f.push({ name: name + 'Ctrl',    dir: 'client/app/controllers/', template: tpl.aController });
if(cmd.resource)    f.push({ name: capitalize(name), dir: 'client/app/resources/',   template: tpl.resource });
if(cmd.directive)   f.push({ name: name,             dir: 'client/app/directives/',  template: tpl.directive });
if(cmd.service)     f.push({ name: '$' + name,       dir: 'client/app/services/',    template: tpl.service });
if(cmd.filter)      f.push({ name: name,             dir: 'client/app/filters/',     template: tpl.filter });



if(f.length){
	console.log(' ');
	console.log('    Creating ' + f.length + ' new file' + ( f.length > 1 ? 's' : '' ) + ':');
}

_.each(f, function(newFile){
	console.log(
		'    ' + chalk.green('new'),
		newFile.dir + chalk.red.bold(newFile.name) + '.js'
	);
	
	fs.writeFile(
		newFile.dir + newFile.name + '.js',
		_.template(fs.readFileSync(__dirname + newFile.template))(data)
	);

	if(cmd.sublime){
		exec(
			'sublime "' + newFile.dir + (newFile.name).replace('$', '\\$') + '.js"',
			function(error, stdout, stderr) {}
		);
	}
	
});


 
function capitalize(str) {
 	var split = str.split('');
 	split[0] = split[0].toUpperCase();
 	return split.join('');
}