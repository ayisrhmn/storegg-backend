const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email must be filled!'],
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
    username: {
      type: String,
      require: [true, 'Username must be filled!'],
      maxLength: [
        225,
        'The length of the username must be between 3 - 225 characters',
      ],
      minLength: [
        3,
        'The length of the username must be between 3 - 225 characters',
      ],
    },
    password: {
      type: String,
      require: [true, 'Password must be filled!'],
      maxLength: [
        225,
        'The length of the password must be between 6 - 225 characters',
      ],
      minLength: [
        6,
        'The length of the password must be between 6 - 225 characters',
      ],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, 'Phone Number must be filled!'],
      maxLength: [
        13,
        'The length of the phone number must be between 9 - 13 characters',
      ],
      minLength: [
        9,
        'The length of the phone number must be between 9 - 13 characters',
      ],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {timestamps: true},
);

playerSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('Player').countDocuments({email: value});
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} already registered`,
);

playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model('Player', playerSchema);
