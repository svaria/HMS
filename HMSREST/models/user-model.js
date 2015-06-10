var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true },
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true}
  }
});

/** encrypts password before saving
 *
 */
UserSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err,salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.validPassword = function(potentialPass, callback) {
  bcrypt.compare(candidatePassword,this.password, function(err, isValid){
    if(err) return callback(err);
    callback(null, isValid);
  });
}


module.exports = mongoose.model('User', UserSchema);
