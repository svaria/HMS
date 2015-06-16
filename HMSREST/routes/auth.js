var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
/** HELPER FUNCTIONS */

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
  /* Account authentication and creation Resources */
  /* Creates a new user and designates an ID,
   * REQUIRES: req.body contain {email:string,
   * password:string}
   */
  router.post('/signup', function(req, res) {
    var user = new User(req.body);
    user.save(function (err,storedUser) {
      if(handleError(err, res)) return;

      res.send({id: storedUser._id});//send success
      console.log("Successfully created user: ");
      return console.log(storedUser);
    });
  });

  // login method
  // in the response headers you will get some session cookies
  // those are your tokens, and you will not need
  // to resend the username password if you just use
  // the session cookies that you get back
  router.post('/login',
    passport.authenticate('basic', {failureRedirect: '/login'}),
    function(req, res){
      res.send(req.user);
    });

  return router;
}
