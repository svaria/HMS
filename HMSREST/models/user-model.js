var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  },
  phonenum: {
    type: Number
  },
  houseId: {
    type: ObjectId,
    ref: 'House',
    default: null
  },
  houseExternalId: {
    type: Number,
    default: -1
  }
});

/** encrypts password before saving
 *
 */
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.checkPassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
}


module.exports = mongoose.model('User', UserSchema);