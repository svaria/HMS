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
             passport.authenticate('basic', {failureRedirect: '/login'}),
             function(req, res, next) {
    res.send('noquery');
  });

  /** Gets a user specified by user id and authenication token
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
        // already registered to a house
        res.send("User already has houseId");
        return;
      }
      // o/w make a house
      var house = new House(req.body);
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
