var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    type: ObjectId,
    ref: 'Item'
  }],
  metadata: {
    type: string
  },
  subscribers: {
    type: ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Tag', TagSchema);