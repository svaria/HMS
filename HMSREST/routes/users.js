var express = require('express');
var router = express.Router();
var User = require('../models/user-model');

module.exports = function(passport){
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


  /* Account Resources */
  /* Creates a new user and designates an ID,
   * REQUIRES: req.body contain {username:string, 
   * password:string}
   */
  router.get('/account/create', function(req, res, next) {
    var user = new User(req.body);
    user.save(function (err,storedUser) {
      if(err){
        res.redirect('/');
        return console.error(err);
      }
      console.log("Successfully stored user: ");
      console.log(storedUser);
    });
  });

  router.post('/account', function(req, res, next) {
  });

  return router;
}
