var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var utils = require('../utils.js');
var House = require('../models/house-model');


module.exports = function(passport) {
  // get house information
  router.get('/',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
      House.findOne({
          _id: user.houseId
        },
        function(err, house) {
          if (utils.handleError(err)) return;
          // otherwise successful
          res.send(house);
        });
    });

  /** House Creation resources */
  router.post('/create',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
      if (user.houseId) {
        res.send("User already has a house");
      } else {
        // TODO: may need to change house initialization to happen on the server
        var house = new House(req.body);
        house.save(function(err, storedHouse) {
          if (handleError(err)) return;
          // update user
          updates = {
            houseId: storedHouse._id
          };

          User.findOneAndUpdate({
            _id: user._id
          }, updates, function(err, updatedUser) {
            if (handleError(err)) return;
            // TODO: do we want user, house, or both
            res.send(updatedUser);
          });
        });
      }
    });

  // join house
  router.post('/join',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
      if (user.houseId) {
        res.send("User already is in a house");
      } else {
        // TODO: update this 
        //House.findOne(req.houseId)
      }
    });


  return router;
};