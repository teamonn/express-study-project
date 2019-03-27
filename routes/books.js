var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.send('Books home page');
});

router.get('/add', function(req, res) {
  res.send('Add an book that you like');
});

router.get('/delete', function(req, res) {
  res.send('Delete an book that you don`t like');
});

router.get('/list', function(req, res) {
  res.send('There is an books list');
});

module.exports = router;
