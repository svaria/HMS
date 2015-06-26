var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var House = require('../models/house-model');
var utils = require('../utils');

module.exports = function(passport) {
  /** Gets a user */
  router.get('/',
    passport.authenticate('session'),
    function(req, res, next) {
      res.send(req.user);
    });

  return router;
};