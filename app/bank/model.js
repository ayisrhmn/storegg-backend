const mongoose = require('mongoose');

let bankSchema = mongoose.Schema({
  accName: {
    type: String,
    require: [true, 'Account Name must be filled!'],
  },
  bankName: {
    type: String,
    require: [true, 'Bank Name must be filled!'],
  },
  noRek: {
    type: String,
    require: [true, 'Rekening Number must be filled!'],
  },
});

module.exports = mongoose.model('Bank', bankSchema);
