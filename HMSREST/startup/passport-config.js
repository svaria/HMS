var mongoose = require('mongoose');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = mongoose.model('User');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done){
    done(null, obj);
  });

  /* Basic Http authentication strategy set up */
  passport.use(new BasicStrategy(
    function(username, password, done) {
      Users.findOne({username:username}, function (err,user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }
        if(!user.validPassword(password)) { return done(null,false); }
        return done(null,user);
    });
}));

}
