var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
/** HELPER FUNCTIONS */
function getUserById(id){
  return User.findOne({_id:id});
}


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
  router.post('/account/create', function(req, res, next) {
    var user = new User(req.body);
    user.save(function (err,storedUser) {
      if(err){
        res.send();// send failure message;
        return console.error(err);
      }
      console.log("Successfully stored user: ");
      console.log(storedUser);
      res.send();//send success
    });
  });

  /** Gets a user specified by user id and authenication token
   * REQUIRES: req.body contain {id: int, authtoken: string}
   */
  router.get('/account/:id', function(req, res, next) {
     return getUserById(req.params.id);
     //TODO - Check authToken
  });

  router.post('/account/:id', function(req, res, next) {
  });

  return router;
}
