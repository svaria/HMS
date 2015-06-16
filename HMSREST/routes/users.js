var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
/** HELPER FUNCTIONS */
/** callback: function(error, user)*/
function lookupUserById(id,callback){
  User.findOne({_id:id}, callback);
}

/* True if there is an error*/
function handleError(err, res) {
  if(err) {
    res.send(err.message);
    console.error(err);
    return true;
  }
  return false;
}
/** END HELPER FUNCTIONS */

module.exports = function(passport){
  /* GET users listing. */
  router.get('/', 
             passport.authenticate('basic', {failureRedirect: '/login'}),
             function(req, res, next) {
    res.send('noquery');
  });

  /** Gets a user specified by user id and authenication token
   * REQUIRES: req.body contain {id: int, authtoken: string}
   */
  router.get('/account/:id', 
             passport.authenticate('basic', {failureRedirect: '/login'}),
             function(req, res, next) {
    lookupUserById(req.params.id, function(err, user){
      if(handleError(err, res)) return;
      if(!user) {
        res.send("Could not find user");
        return console.error("Could not find user");
      }
      res.send(user);
      return;
    });
    //TODO - Check authToken
  });

  router.put('/account/:id', function(req, res, next) {
    //PUT REQUIRED CHANGES IN req.body
  });

  /** House Creation resources */
  router.post('/house/create/:userid/',
              passport.authenticate('basic', {failureRedirect: '/login'}),
              function(req, res, next) {
    lookupUserById(req.params.userid, function(err, user){
      if(handleError(err, res)) return;
      if(user.houseId) {
        res.send("User already has houseId");
        return;
      }
      var house = new House(req.body);
      house.save(function(error, storedHouse){
        if(handleError(err, res)) return;
        res.send({houseid: storedHouse._id});
        console.log("Successfully created House");
        return console.log(storedHouse);
      });
    });
  });

  router.get('/house/:userid/', function(req, res, next) {
    
  });

  return router;
}
