/*

	rest(name, model, router)
	
	Name is a string, which is the name of the resource.
	Model is a mongoose model.
	Router is an express router. If none is provided, it'll make it's own
	
	Creates a restful api.
	
	Returns an express router.
	
	
	These are the requests that are created/supported
	
	GET    /api/resource/[:id][?query=params] Get one or many resources, queryable.
	POST   /api/resource/                     Create a resource
	PUT    /api/resource/:id                  Update one resource
	DELETE /api/resource/:id                  Delete one resource

*/

// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------
var _ = require('lodash');
var express = require('express');
var extractProp = require('extract-prop'); 

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

module.exports = function(name, model, router){
	
	if(!router){
		router = express.Router();
	}
	
	router.get('/' + name + '/:id?', function(req, res) {
		// store the query string
		var query = req.query;
		
		// remove the _populate query if it exists
		var pop = extractProp(query, '_populate');
		var sort = extractProp(query, '_sort');
		
		// store the model
		var m = model;
		
		// if the id was in the url
		if(req.params.id){
			// then add the id to the query
			query._id = req.params.id;
			
			// find one document with the query
			m = m.findOne(query);
		}else{
			// find many documents with the query
			m = m.find(query);
		}
		
		// if the _populate query existed
		if(pop){
			// then use deepPopulate to populate that record
			m = m.deepPopulate(pop);
		}
		
		if(sort){
			m = m.sort(sort);
		}
		
		// run the query
		m.exec(function(err, docs){
			if(err){
				res.send(err);
				return;
			}
			
			res.send(docs);
		});
	});

	router.post('/' + name + '/', function(req, res) {
		var doc = new model();
		
		doc = _.merge(doc, req.body);
		
		doc.save();
		
		res.send(doc);
	});

	router.put('/' + name + '/:id', function(req, res) {
		model.findOne({ _id: req.params.id }, function(err, doc){
			if(err){
				res.send(err);
				return;
			}
			
			doc = _.merge(doc, req.body);
			
			doc.save();
			
			res.send(doc);
		});
	});

	router.delete('/' + name + '/:id', function(req, res) {
		model.findOne({ _id: req.params.id }, function(err, doc){
			if(err){
				res.send(err);
				return;
			}
			
			doc.remove();
			
			res.send(doc);
		});
	});

	return router;
};