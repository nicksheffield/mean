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
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var schema = new mongoose.Schema({
	created_at: {type: Date, default: new Date()},
	deleted_at: {type: Mixed, default: false}
	// set up your own schema here
});

// https://github.com/buunguyen/mongoose-deep-populate/blob/master/README.md
schema.plugin(deepPopulate);


// ----------------------------------------------------------------------------
// Hooks
// ----------------------------------------------------------------------------
schema.pre('save', function(next){
	// do stuff before save here.
	var doc = this;
	
	next();
});

schema.post('save', function(doc){
	// do stuff after save here
});

schema.post('remove', function(doc){
	// do stuff after deletion here
});

// ----------------------------------------------------------------------------
// Model
// ----------------------------------------------------------------------------
module.exports = mongoose.model('<%- capitalizedName %>', schema);