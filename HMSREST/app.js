var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');



//var GoogleStrategy = require('passport-google').Strategy;
var app = express();

// Conect to HMS db
var connect = function() {
  mongoose.connect('mongodb://localhost/HMS');
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


// Load models
require('./models/user-model');

// start passport correctly
require('./startup/passport-config')(passport);

// start express correctly
require('./startup/express-config')(app, passport);


// correctly configure routes
require('./startup/routes-config')(app, passport);



module.exports = app;

/* Google Passport set up 
passport.use(new GoogleStrategy({
  returnURL: 'localhost:3000/auth/google/return',
  realm: 'localhost:3000'
},
function(identifier, profile, done) {
  User.findOrCreate({openId: identifier}, function(err, user){
    done(err,user);
  });
}));

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return', 
           passport.authenticate('google', { successRedirect: '/',
                                 failureRedirect: '/login' }));
/* end passport setup */

