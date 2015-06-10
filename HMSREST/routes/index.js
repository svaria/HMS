var express = require('express');
var router = express.Router();
var User = require('../models/user-model');

module.exports = function(passport) {
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = new User({username: 'dog', 
                      password: 'cat', 
                      name: {first: 'catdog', last: 'ratdog'}
  });
  user.save(function(err, storedUser){
    if(err){
      res.render('index', {title: 'Failed'});
      return console.log(err);
    }
    res.send(storedUser);
    return console.log('successful adding dog');
  });

});

return router;
}
