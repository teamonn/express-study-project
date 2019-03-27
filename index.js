var express = require('express');
var app = express();

app.set('views', './view')
app.set('view engine', 'pug');
//开放统一资源
app.use('/public/', express.static('./public/'));

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
