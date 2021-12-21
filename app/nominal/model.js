const mongoose = require('mongoose');

let nominalSchema = mongoose.Schema(
  {
    coinName: {
      type: String,
      require: [true, 'Coin Name must be filled!'],
    },
    coinQty: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Nominal', nominalSchema);
