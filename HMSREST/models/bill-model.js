var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
  name: {
    type: String
  },
  totalAmount: {
    type: Number
  },
  amountDue: {
    type: Number
  },
  dueDate: {
    type: Number
  },
  additionalInfo: {
    type: String
  }
});

module.exports = mongoose.model('Bill', BillSchema);