const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('../db/userModel');
require('../db/')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});