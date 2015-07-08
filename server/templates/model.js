// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------
var mongoose = require('mongoose');
var _ = require('lodash');
var deepPopulate = require('mongoose-deep-populate');


// ----------------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------------
// http://mongoosejs.com/docs/guide.html
var schema = new mongoose.Schema({
	created_at: {type: Date, default: new Date()}
	// set up your own schema here
});

schema.plugin(deepPopulate);


// ----------------------------------------------------------------------------
// Hooks
// ----------------------------------------------------------------------------
schema.pre('save', function(next){
	// do stuff before save here.
	// "this" keyword refers to the <%- name %> doc
	next();
});

schema.post('save', function(doc){
	// do stuff after save here
	// doc var refers to the <%- name %> doc
});

schema.post('remove', function(doc){
	// do stuff after deletion here
	// doc var refers to the <%- name %> doc
});

// ----------------------------------------------------------------------------
// Model
// ----------------------------------------------------------------------------
module.exports = mongoose.model('<%- capitalizedName %>', schema);