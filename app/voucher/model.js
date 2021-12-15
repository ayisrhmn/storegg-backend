const mongoose = require('mongoose');

let voucherSchema = mongoose.Schema({
  game_name: {
    type: String,
    require: [true, 'Game Name must be filled!'],
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  nominals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominal',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Voucher', voucherSchema);
