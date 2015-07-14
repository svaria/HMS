var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
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
  },
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }]
});

HouseSchema.plugin(autoIncrement.plugin, {
  model: 'House',
  field: 'externalId',
  startAt: 1000
});

module.exports = mongoose.model('House', HouseSchema);