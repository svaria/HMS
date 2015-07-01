var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var utils = require('../utils');
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
          if (utils.handleError(err, res)) return;
          // otherwise successful
          res.send(house);
        });
    });

  /** House Creation resources */

  /*  req.body must contain address information */
  router.post('/create',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
      if (user.houseId) {
        var houseError = new Error();
        houseError.name = 'HouseError';
        houseError.displayableMessage = 'User is already in a House';
        utils.handleError(houseError, res);
        return;
      } else {
        // TODO: may need to change house initialization to happen on the server
        req.body.creator = user._id;
        req.body.users = [user._id];
        var house = new House(req.body);
        house.save(function(err, storedHouse) {
          if (utils.handleError(err, res)) return;
          // update user
          var updates = {
            houseId: storedHouse._id,
            houseExternalId: storedHouse.externalId
          };

          User.findOneAndUpdate({
            _id: user._id
          }, updates, {
            'new': true
          }, function(err, updatedUser) {
            if (utils.handleError(err, res)) return;
            console.log(updatedUser);
            res.send({
                'user': updatedUser,
                'house': storedHouse
              });
          });
        });
      }
    });

  // join house
  // Requires req.body to have param externalId
  router.post('/join',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
      if (user.houseId) {
        var houseError = new Error();
        houseError.name = 'HouseError';
        houseError.displayableMessage = 'User is already in a House';
        utils.handleError(houseError, res);
        return;
      } else {
        // find the house and join it
        House.findOne(req.body.externalId, function(err, house) {
          err.displayableMessage("You entered a bad house code");
          if (utils.handleError(err, res)) return;
          // join house
          var updatedUsers = house.users;
          updatedUsers.push(user._id);
          var houseUpdates = {
            users: updatedUsers
          };

          // first find house to update with new user
          House.findOneAndUpdate({
            _id: house._id
          }, houseUpdates, {
            new: true
          }, function(err, updatedHouse) {
            if (utils.handleError(err, res)) return;
            // after house update success, update user model
            var userUpdates = {
              houseId: updatedHouse._id,
              houseExternalId: updatedHouse.externalId
            };
            User.findOneAndUpdate({
              _id: user._id
            }, userUpdates, {
              'new': true
            }, function(err, updatedUser) {
              if (utils.handleError(err, res)) return;
              res.status(200).send({
                'user': updatedUser,
                'house': updatedHouse
              });
            });
          });
        });
      }
    });

  return router;
};