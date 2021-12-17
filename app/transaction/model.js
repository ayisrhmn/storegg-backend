const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopUp: {
      gameName: {
        type: String,
        require: [true, 'Game Name must be filled!'],
      },
      category: {
        type: String,
        require: [true, 'Category must be filled!'],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, 'Coin Name must be filled!'],
      },
      coinQty: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
    historyPayment: {
      accName: {
        type: String,
        require: [true, 'Name must be filled!'],
      },
      type: {
        type: String,
        require: [true, 'Type must be filled!'],
      },
      bankName: {
        type: String,
        require: [true, 'Bank Name must be filled!'],
      },
      noRek: {
        type: String,
        require: [true, 'Rekening Number must be filled!'],
      },
    },
    name: {
      type: String,
      require: [true, 'Name must be filled!'],
      maxLength: [
        225,
        'The length of the name must be between 3 - 225 characters',
      ],
      minLength: [
        3,
        'The length of the name must be between 3 - 225 characters',
      ],
    },
    accountUser: {
      type: String,
      require: [true, 'Account Name must be filled!'],
      maxLength: [
        225,
        'The length of the name must be between 3 - 225 characters',
      ],
      minLength: [
        3,
        'The length of the name must be between 3 - 225 characters',
      ],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    historyUser: {
      name: {
        type: String,
        require: [true, 'Player Name must be filled!'],
      },
      phoneNumber: {
        type: String,
        require: [true, 'Phone must be filled!'],
        maxLength: [
          13,
          'The length of the phone must be between 9 - 13 characters',
        ],
        minLength: [
          9,
          'The length of the phone must be between 9 - 13 characters',
        ],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    voucherTopUp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Transaction', transactionSchema);
