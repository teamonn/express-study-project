var mongoose = require('mongoose');
var BookSchema = require('../schemas/books');
var Book = mongoose.model('Book', BookSchema);

module.exports = Book;