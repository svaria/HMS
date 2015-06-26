var mongoose = require('mongoose');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = mongoose.model('User');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /* Basic Http authentication strategy set up */
  passport.use(new BasicStrategy({
      usernameField: 'email'
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.checkPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }));

};