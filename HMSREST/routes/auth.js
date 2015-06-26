var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var utils = require('../utils.js');

module.exports = function(passport) {
  /* Account authentication and creation Resources */
  /* Creates a new user and designates an ID,
   * REQUIRES: req.body contain {email:string,
   * password:string}
   */
  router.post('/signup', function(req, res) {
    var user = new User(req.body);
    user.save(function(err, storedUser) {
      if (utils.handleError(err, res)) return;

      res.send(storedUser); //send success
      return;
    });
  });

  // login method
  // in the response headers you will get some session cookies
  // those are your tokens, and you will not need
  // to resend the username password if you just use
  // the session cookies that you get back
  router.post('/login',
    passport.authenticate('basic'),
    function(req, res) {
      res.send(req.user);
    });

  router.get('/logout', function(req, res) {
    req.logout();
    res.send("logged out");
  });

  return router;
}