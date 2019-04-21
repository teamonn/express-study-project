var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  bookId: String,
  bookName: String,
  bookDesc: String
});

//每次在存储数据之前都会来调用一下这个方法
BookSchema.pre('save', function (next) {
  next();
});

BookSchema.statics = {
  fetch: function (cb) {    // 取出数据库里所有数据
    return this
        .find({})
        .sort('bookId')
        .exec(cb);
  },
  findById: function (id, cb) {     // 取出数据库里的第一条数据
    return this
        .findOne({ bookId: id })
        .exec(cb);
  }
}

module.exports = BookSchema;
