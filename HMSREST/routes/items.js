var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var utils = require('../utils');
var House = require('../models/house-model');
var Item = require('../models/item-model');

var getOrCreateTag = function(req) {
  return; //some tag
}

module.exports = function(passport) {
  // get house information
  router.get('/',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
    });

  /** House Creation resources */

  /*  req.body must contain address information 
   * TODO discuss how to send other users
   */
  router.post('/add',
    passport.authenticate('session'),
    function(req, res, next) {
      var user = req.user;
      // TODO choose type and correctly create item and get tags
      var item = new Item(req.body);
      var bill = new Bill(req.body.bill);
      var tag = getOrCreateTag(req);

      // update models
      bill.save(function(err, storedBill) {
        if (utils.handleError(err, res)) return;
        // once bill is saved store item
        item.opt_bill = storedBill._id;
        item.save(function(err, storedItem) {
          if (utils.handleError(err, res)) {
            // TODO delete bill, and cleanup
            return;
          }
          // update user
          user.items.push(storedItem._id)
          var userUpdates = {
            items: user.items;
          }

          User.findOneAndUpdate({
            _id: user._id
          }, updates, {
            'new': true
          }, function(err, updatedUser) {
            if (utils.handleError(err, res)) {
              // TODO cleanup bill and item
              return;
            }
            // TODO update tags, talk to dan about tag workflow
            res.status(200).send(storedItem);
          });
        });
      });



    });

  return router;
};