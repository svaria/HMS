var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var House = require('../models/house-model');
/** HELPER FUNCTIONS */
/** callback: function(error, user)*/
function lookupUserById(id,callback){
  User.findOne({_id:id}, callback);
}

function lookupHouseById(id, callback){
  House.findOne({_id:id}, callback);
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
             passport.authenticate('session'),
             function(req, res, next) {
    res.send('noquery');
  });

  /** Gets a user specified by user id and authenication token
   */
  router.get('/account',
             passport.authenticate('session'),
             function(req, res, next) {
    res.send(req.user);
  });

  /** House Creation resources */
  router.post('/house/create/:userid/',
              passport.authenticate('session'),
              function(req, res, next) {
    lookupUserById(req.params.userid, function(err, user){
      if(handleError(err, res)) return;
      if(user.houseId) {
        // already registered to a house
        res.send("User already has houseId");
        return;
      }
      // o/w make a house
      var house = new House(req.body);
      //house.users.push(req.params.userid);
      house.save(function(error, storedHouse){
        if(handleError(err, res)) return;
        res.send({houseid: storedHouse._id});
        console.log("Successfully created House");
        return console.log(storedHouse);
      });
    });
  });

  // get house information
  router.get('/house/:userid', 
             passport.authenticate('basic', {failureRedirect: "/"}),
             function(req, res, next) {
      // get user then get house
      lookupUserById(req.params.userid, function(err, user){
        if(handleError(err,res)) return;
        // now get house by user.houseid
        lookupUserById(user.houseId, function(err, house){
          if(handleError(err,res)) return;
          if(house){
            res.send(house);
          }
          return;
        });
     });
  });

  return router;
}
