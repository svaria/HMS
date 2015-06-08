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
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cookieSession({secret: 12589}));
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
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));
};
