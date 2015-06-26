var users = require('../routes/users');
var houses = require('../routes/houses');
var auth = require('../routes/auth');

module.exports = function(app, passport) {
  // configure routes correctly
  app.use('/', auth(passport));
  app.use('/users', users(passport));
  app.use('/houses', houses(passport));

  // error handlers
  //app.set('env', 'development');
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

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).send('404: Sorry cant find that!');
  });

}