// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var router = express.Router();
var rest = require('../modules/rest');
var mem = require('../modules/memory');


// ----------------------------------------------------------------------------
// Models
// ----------------------------------------------------------------------------
var Product = mongoose.models.Product;


// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

// custom routes can be added

// router.get('/example', function(req, res){
// 	res.send('yo!');
// });

// Set up the default GET/POST/PUT/DELETE of a REST api
router = rest('product', Product, router);



// ----------------------------------------------------------------------------
// Export
// ----------------------------------------------------------------------------
module.exports = router;