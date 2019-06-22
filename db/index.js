const mongoose = require('mongoose');
const MONGO_URL = require('./MONGO_URL');

mongoose.connect(MONGO_URL, {
  dbName: 'RH',
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err) => {
  if (err) return console.log('MongoDB Connection Error:', err);
  console.log('MongoDB Connected!');
});

