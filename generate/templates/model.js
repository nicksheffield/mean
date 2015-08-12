// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------
var mongoose = require('mongoose');
var _ = require('lodash');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;


// ----------------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------------
// http://mongoosejs.com/docs/guide.html
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

var <%= name %>Schema = new Schema({
	created_at: {type: Date, default: new Date()},
	deleted_at: {type: Mixed, default: false}
	// set up your own schema here
});

// https://github.com/buunguyen/mongoose-deep-populate/blob/master/README.md
<%= name %>Schema.plugin(deepPopulate);


// ----------------------------------------------------------------------------
// Hooks
// ----------------------------------------------------------------------------
<%= name %>Schema.pre('save', function(next){
	// do stuff before save here.
	var doc = this;
	
	next();
});

<%= name %>Schema.post('save', function(doc){
	// do stuff after save here
});

<%= name %>Schema.post('remove', function(doc){
	// do stuff after deletion here
});

// ----------------------------------------------------------------------------
// Model
// ----------------------------------------------------------------------------
module.exports = mongoose.model('<%= capitalizedName %>', <%= name %>Schema);