var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('localhost:27017/HMS');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* Account Resources */
router.get('/account', function(req, res, next) {

  db.users.insert();
});

router.post('/account/:email/:firstName/:lastName/:phoneNum/', function(req, res, next) {
});

module.exports = router;
