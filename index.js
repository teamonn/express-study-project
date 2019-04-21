var express = require('express');
var app = express();
var routes = require('./routes/index');
var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var Book = require('./models/books')

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

// 连接数据库
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB connection success!')
});

/**
 * 页面路由
 */

// app.get('/', function (req, res) {
//   // res.send('Hello World!');
//   console.log(`req.requestTime:${req.requestTime}`)
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });

app.use('/', routes);

app.get('/books', function (req, res) {
  res.send('Books home page');
});

app.get('/books/add', function (req, res) {
  res.render('books/add', { title: 'Books add page' })
});

app.get('/books/detail/:id', function (req, res) {
  // console.log(req.query.id)
  var id = req.params.id
  Book.findById(id, function (err, book) {
    res.render('books/detail', { title: 'Books detail page', book })
  })
});

app.get('/books/edit/:id', function (req, res) {
  var id = req.params.id
  Book.findById(id, function (err, book) {
    res.render('books/edit', { title: 'Books edit page', book })
  })
});

app.get('/books/list', function (req, res) {
  Book.fetch(function (err, list) {
		if (err) {
			console.log(err);
    }
    res.render('books/list', { title: 'There is books list', list })
	});
});

app.get('*', function (req, res) {
  res.send('对不起，你要找的页面不存在！');
});

/**
 * 接口请求路由
 */

app.post('/books/new', function (req, res) {
  var book = new Book(req.body);
  book.save(function (err) {
    if (err) return handleError(err);
    res.redirect('/books/list');
  })
});

app.post('/books/change', function (req, res) {
  Book.findOneAndUpdate({ bookId: req.body.bookId }, req.body, function (err, book) {
    if (err) {
      console.log('err:', err);
      return;
    }
    res.redirect('/books/list');
  })
});

app.post('/books/delete', function(req, res) {
  var id = req.body.bookId
  Book.remove({ bookId: id }, function (err) {
    if (err) return handleError(err);
    res.send('removed!');
  });
});

// 自定义中间件，提示服务异常
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('服务器开了小差呢，请稍后重试...')
})

// serves log
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
