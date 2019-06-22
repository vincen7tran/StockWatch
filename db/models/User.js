const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  stocks: {
    type: Array,
  }
});

module.exports = User;