const mongoose = require('mongoose');

const User = mongoose.model('User', {
  userId: {
    type: Number,
    required: true,
    unique: true,
    validate(val) {
      if (val < 0) throw new Error('Listing ID must be positive.');
    },
  },
  stocks: {
    type: Array,
    required: true
  }
});

module.exports = User;