var express = require('express');
var app = express();
var routes = require('./routes/index');
var bodyParser = require('body-parser');

app.set('views', './views')
app.set('view engine', 'pug');

//开放统一资源
app.use('/public/', express.static('./public/'));

// 中间件函数
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(requestTime);

app.use(bodyParser.json({limit: '1mb'}));  // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            // 此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

// app.get('/', function (req, res) {
//   // res.send('Hello World!');
//   console.log(`req.requestTime:${req.requestTime}`)
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });

/**
 * 页面路由
 */

app.use('/', routes);

app.get('/books', function(req, res) {
  res.send('Books home page');
});

app.get('/books/add', function(req, res) {
  // res.send('Add an book that you like');
  res.render('books/add', { title: 'Books add page'})
});

app.get('/books/detail/:id', function(req, res) {
  // console.log(req.query.id)
  var id = req.params.id
  booksList.forEach((i, idx) => {
    if (i.bookId === id) {
      id = idx
    }
  });
  res.render('books/detail', { title: 'Books detail page', book: booksList[id] })
});

app.get('/books/edit/:id', function(req, res) {
  var id = req.params.id
  booksList.forEach((i, idx) => {
    if (i.bookId === id) {
      id = idx
    }
  });
  res.render('books/edit', { title: 'Books edit page', book: booksList[id] })
});

app.get('/books/list', function(req, res) {
  // res.send('There is an books list');
  res.render('books/list', { title: 'There is an books list', list: booksList })
});

/**
 * 接口请求路由
 */

app.post('/books/new', function (req, res) {
  booksList.push(req.body)
  res.redirect('/books/list');
});

app.post('/books/change', function (req, res) {
  var id = req.body.bookId
  booksList.forEach((i, idx) => {
    if (i.bookId === id) {
      booksList[idx] = req.body
    }
  });
  res.redirect('/books/list');
});

app.post('/books/delete', function(req, res) {
  var id = req.body.bookId
  booksList.forEach((i, idx) => {
    if (i.bookId === id) {
      booksList.splice(idx, 1)
    }
  });
  res.send('Delete an book that you don`t like');
});

var booksList = [{
  bookId: '0',
  bookName: '二十四史',
  bookDesc: '中国各朝代编年体史书，极具史料研究和文学价值'
}];

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
