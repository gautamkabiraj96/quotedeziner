var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
    quote: String,
    author: String,
    category: String
});

module.exports = mongoose.model('Quote', quoteSchema);