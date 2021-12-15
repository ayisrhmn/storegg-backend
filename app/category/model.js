const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Category must be filled!'],
  },
});

module.exports = mongoose.model('Category', categorySchema);
