var express = require('express');
var router = express.Router();
var User = require('../models/user-model');

function lookupHouseById(id, callback){
  House.findOne({_id:id}, callback);
}

module.exports = function(passport) {
// get house information
  router.get('/', 
             passport.authenticate('session'),
             function(req, res, next) {

  });

   /** House Creation resources */
  router.post('/create',
              passport.authenticate('session'),
              function(req, res, next) {
    var user = req.user;
  });

  // join house
  router.post('/join',
              passport.authenticate('session'),
              function(req, res, next) {
  });

  
return router;
};
