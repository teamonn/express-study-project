var express = require('express');
var app = express();
var routes = require('./routes/index');
var books = require('./routes/books');

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

// app.get('/', function (req, res) {
//   // res.send('Hello World!');
//   console.log(`req.requestTime:${req.requestTime}`)
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });

app.use('/', routes);
app.use('/books', books);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
