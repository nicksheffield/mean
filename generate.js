#!/usr/bin/env node
 
var program = require('commander');
var fs = require('fs');
var _ = require('lodash');
 
program
	.version('0.0.1')
	.usage('<name>')
	.parse(process.argv);

var name = String(program.args[0]).toLowerCase();

console.log('Creating '+name+':');

var modelTemplate = _.template(fs.readFileSync(__dirname      + '/server/templates/model.js'));
var controllerTemplate = _.template(fs.readFileSync(__dirname + '/server/templates/controller.js'));
var resourceTemplate = _.template(fs.readFileSync(__dirname   + '/server/templates/resource.js'));

var data = {
	name: name,
	capitalizedName: capitalize(name)
};


fs.writeFile(__dirname + '/server/models/'+name+'.js', modelTemplate(data));
fs.writeFile(__dirname + '/server/controllers/'+name+'.js', controllerTemplate(data));
fs.writeFile(__dirname + '/client/app/resources/'+capitalize(name)+'.js', resourceTemplate(data));



 
function capitalize(str) {
 	var split = str.split('');
 	split[0] = split[0].toUpperCase();
 	return split.join('');
}