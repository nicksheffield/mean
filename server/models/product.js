// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------
var mongoose = require('mongoose');
var _ = require('lodash');
var deepPopulate = require('mongoose-deep-populate');


// ----------------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------------
var schema = new mongoose.Schema({
	name: String,
	price: Number,
	description: String,
	image: String,
	created_at: {type: Date, default: new Date()},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

schema.plugin(deepPopulate);


// ----------------------------------------------------------------------------
// Hooks
// ----------------------------------------------------------------------------
schema.pre('save', function(next){
	// do stuff before save here.
	// "this" keyword refers to the doc
	next();
});

schema.post('save', function(doc){
	// do stuff after save here
	// doc var refers to the doc
});

schema.post('remove', function(doc){
	// do stuff after deletion here
	// doc var refers to the doc
});

// ----------------------------------------------------------------------------
// Model
// ----------------------------------------------------------------------------
module.exports = mongoose.model('Product', schema);