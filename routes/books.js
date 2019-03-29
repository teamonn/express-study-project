var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

// define the home page route
router.get('/', function(req, res) {
  res.send('Books home page');
});

router.get('/add', function(req, res) {
  // res.send('Add an book that you like');
  res.render('books/add', { title: 'Books add page', message: 'Books add page'})
});

router.get('/delete', function(req, res) {
  // res.send('Delete an book that you don`t like');
  res.render('books/delete', { title: 'Books delete page', message: 'Books delete page'})
});

router.get('/list', function(req, res) {
  // res.send('There is an books list');
  res.render('books/list', { list: booksList })
});

// 请求接口
router.post('/new', function (req, res) {
  console.log(req.body)
  booksList.push(req.body)
  res.redirect('/books/list');
  // res.render('books/list', { list: booksList })
  // res.send({
  //   name: 'testName'
  // });
});

var booksList = [{
  name: '二十四史',
  desc: '中国各朝代编年体史书，极具史料研究和文学价值'
}];

module.exports = router;
