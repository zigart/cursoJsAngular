'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var projectSchema = schema({
    name: String,
    description: String,
    category: String,
    year: String,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', projectSchema);
//projects en base de datos