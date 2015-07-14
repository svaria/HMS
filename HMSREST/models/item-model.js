var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var ItemSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  opt_bill: {
    type: ObjectId,
    ref: 'Bill'
  }
  recurrent: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }]
});

module.exports = mongoose.model('Item', ItemSchema);