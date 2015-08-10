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
var <%- capitalizedName %> = mongoose.models.<%- capitalizedName %>;


// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

// custom routes can be added

// router.get('/<%- name %>', function(req, res){
// 	res.send('yo!');
// });

// Set up the default GET/POST/PUT/DELETE of a REST api
router.use(rest('<%- name %>', <%- capitalizedName %>));



// ----------------------------------------------------------------------------
// Export
// ----------------------------------------------------------------------------
module.exports = router;