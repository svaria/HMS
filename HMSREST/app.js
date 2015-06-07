var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy;
var GoogleStrategy = require('passport-google').Strategy

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


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

/* Basic Http authentication strategy set up */
passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username:username}, function (err,user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false); }
      if(!user.validPassword(password)) { return done(null,false) }
      return done(null,user);
    });
}));




module.exports = app;
