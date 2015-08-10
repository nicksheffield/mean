/*

	rest(name, model, router)
	
	Name is a string, which is the name of the resource. This is used in the urls.
	Model is a mongoose model object.
	Router is an express router object. If none is provided, it'll make it's own
	
	Creates a restful api.
	
	Returns an express router.
	
	
	These are the requests that are created/supported
	
	GET    /api/resource/[:id]     Get one or many resources, by providing id or not
	POST   /api/resource/          Create a resource
	PUT    /api/resource/:id       Update one resource
	DELETE /api/resource/:id       Delete one resource
	
	The GET route (without an id) can have a query string applied to narrow down results,
	or do other useful things.
	
	Name 			Description									Example
	---------------------------------------------------------------------
	field 			Narrows results like a where query 			?email=user@example.com
	_populate		Populates an ObjectId field 				?_popualte=posts
	_sort			Sorts results 								?_sort=created_at
	_withtrash		Includes soft-deleted records				?_withtrash=true
	_trashed		ONLY get soft-deleted records				?_trashed=true
	_hard			(for DELETE request only) hard delete 		?_hard=true
	

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

module.exports = function(name, model, router) {

	if (!router) {
		router = express.Router();
	}


	// ============================================================================
	// Get one or many
	// ============================================================================

	router.get('/' + name + '/:id?', function(req, res) {
		// store the query string
		var query = req.query;

		// remove the _populate query if it exists
		var pop = extractProp(query, '_populate');
		var sort = extractProp(query, '_sort');
		var withTrash = extractProp(query, '_withtrash');
		var trashed = extractProp(query, '_trashed');

		// store the model
		var m = model;

		// if the id was in the url
		if (req.params.id) {
			// then add the id to the query
			query._id = req.params.id;

			// find one document with the query
			m = m.findOne(query);
		} else {

			// if the trashed query existed
			if (trashed) {
				// get all the documents where deleted_at is not false
				query.deleted_at = {
					$ne: false
				};

				// if the _withtrash query did not exist
			} else if (!withTrash) {
				// add a deleted_at field to the query
				query.deleted_at = false;
			}

			// find many documents with the query
			m = m.find(query);
		}

		// if the _populate query existed
		if (pop) {
			// then use deepPopulate to populate that field
			m = m.deepPopulate(pop);
		}

		// if the _sort query existed
		if (sort) {
			// then use it to sort the records
			m = m.sort(sort);
		}

		// run the query
		m.exec(function(err, docs) {
			if (err) {
				res.send(err);
				return;
			}

			// if the request is for one document and no document was found
			if (req.params.id && !docs) {
				// set the response status to 404
				res.status(404);

				// and send a json object containing information about what went wrong
				res.send({
					'status': '404',
					'message': 'No ' + name + ' was found with an id of ' + req.params.id
				});
			}

			res.send(docs);
		});
	});


	// ============================================================================
	// Create one
	// ============================================================================

	router.post('/' + name + '/', function(req, res) {
		var doc = new model();

		// make sure we can't set the _id manually
		delete req.body._id;

		// merge the post data into the new model
		doc = _.merge(doc, req.body);

		// save the document into the database
		doc.save();

		// send it as json
		res.send(doc);
	});


	// ============================================================================
	// Update one
	// ============================================================================

	router.put('/' + name + '/', function(req, res) {
		// catch missing id's instead of causing RangeError
		res.status(404);

		res.send({
			'status': '404',
			'message': 'No id provided in url'
		});
	});

	router.put('/' + name + '/:id', function(req, res) {
		// find one document with the id provided in the url param
		model.findOne({
			_id: req.params.id
		}, function(err, doc) {

			// if it wasn't found, then send the error
			if (err) {
				res.send(err);
				return;
			}

			// if no document was found
			if (!doc) {
				// set the response status to 404
				res.status(404);

				// and send a json object containing information about what went wrong
				res.send({
					'status': '404',
					'message': 'No ' + name + ' was found with an id of ' + req.params.id
				});
			}

			// make sure we can't set the _id manually
			delete req.body._id;

			// merge the post data into the new model
			doc = _.merge(doc, req.body);

			// save the document into the database
			doc.save();

			// send it as json
			res.send(doc);
		});
	});


	// ============================================================================
	// Delete one
	// ============================================================================

	router.delete('/' + name + '/', function(req, res) {
		// catch missing id's instead of causing RangeError
		res.status(404);

		res.send({
			'status': '404',
			'message': 'No id provided in url'
		});
	});

	router.delete('/' + name + '/:id', function(req, res) {
		model.findOne({
			_id: req.params.id
		}, function(err, doc) {
			if (err) {
				res.send(err);
				return;
			}

			if (!doc) {
				res.status(404);
				res.send({
					'status': '404',
					'message': 'No ' + name + ' was found with an id of ' + req.params.id
				});
			}

			// if the hard query existed on the url
			if (req.query._hard) {

				// delete the record from the database
				doc.remove();

				// if not, then soft delete.s
			} else {

				// set the deleted_at date
				doc.deleted_at = new Date();

				// save the doc
				doc.save();

				// manually call the post remove hook
				doc.$__.emitter._events.remove(doc);
			}

			res.send(doc);
		});
	});

	return router;
};