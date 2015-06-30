var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var ObjectId = Schema.ObjectId;

var HouseCounterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 1000
  }
});

var counter = mongoose.model('Counter', HouseCounterSchema);

var HouseSchema = new Schema({
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  externalId: {
    type: Number,
    default: -1,
    index: {
      unique: true
    }
  },
  address1: {
    type: String
  },
  address2: {
    type: Number
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: Number
  }
});

/*HouseSchema.pre('save', function(next) {
  var house = this;
  counter.findByIdAndUpdate({
    _id: 'houseCounterId'
  }, {
    $inc: {
      seq: 1
    }
  }, function(error, foundCounter) {
    if (error) return next(error);
    house.externalId = foundCounter.seq;
    next();
  });
});*/

HouseSchema.plugin(autoIncrement.plugin, {model: 'House', field: 'externalId', startAt: 1000});
module.exports = mongoose.model('House', HouseSchema);