var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var House = require('../models/house-model');
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

  return router;
};
