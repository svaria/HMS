var index = require('../routes/index');
var users = require('../routes/users');

module.exports = function(app,passport) {
  // configure routes correctly

  /* Account creation Resources */
  /* Creates a new user and designates an ID,
   * REQUIRES: req.body contain {email:string,
   * password:string}
   */
  app.post('/signup', function(req, res) {
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
  app.get('/login',
    passport.authenticate('basic', {failureRedirect: '/login'}),
    function(req, res){
      res.json(req.user);
    });


  app.use('/users', users(passport));

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
