var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
/** HELPER FUNCTIONS */
function getUserById(id,callback){
  User.findOne({_id:id}, function(err, foundUser){
    if(err) return err;
    callback(foundUser);
  });
}


module.exports = function(passport){
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('noquery');
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
        res.send({error: err.message});// send failure message;
        return console.error(err);
      }
      console.log("Successfully stored user: ");
      console.log(storedUser);
      res.send({id: storedUser.id});//send success
    });
  });

  /** Gets a user specified by user id and authenication token
   * REQUIRES: req.body contain {id: int, authtoken: string}
   */
  router.get('/account/:id', function(req, res, next) {
     getUserById(req.params.id, function(user){
        res.send(user);
     });
     //TODO - Check authToken
  });


  router.put('/account/:id', function(req, res, next) {
    //PUT REQUIRED CHANGES IN req.body
    
  });

  return router;
}
