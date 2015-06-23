var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongostore = require('connect-mongo')(session);

module.exports = function(app, passport){
  // view engine setup
  app.set('views', '/Users/shaanvaria/Documents/HMS/HMSREST/views');
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.static('/Users/shaanvaria/Documents/HMS/HMSREST/public'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieSession({secret: '12589sfafw1a12'}));
  app.use(session({ 
    secret: '12312901', 
    resave: true, 
    saveUninitialized: true,
    store: new mongostore({
      url: 'mongodb://localhost/HMS',
      collection : 'sessions'
    })
  }));

  //passport startup
  app.use(passport.initialize());
  app.use(passport.session());
};
