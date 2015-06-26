var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var HouseSchema = new Schema({
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
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


module.exports = mongoose.model('House', HouseSchema);