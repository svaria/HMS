var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//require('pretty-error').start();
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