var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var HouseSchema = new Schema({
  creator: {type: ObjectId, ref: 'User'},
  users: [{type: ObjectId, ref: 'User'}],
  address: {type: String, required: true}
});


module.exports = mongoose.model('House', HouseSchema);
