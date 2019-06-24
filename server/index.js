const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const User = require('../db/models/User');
require('../db/')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users', async (req, res) => {
  const { email }  = req.query;
    console.log(email);
  try {
    const result = await User.findOneAndUpdate({ email }, { email }, { upsert: true, rawResult: true, new: true });
    const { value, lastErrorObject } = result;

    if (lastErrorObject.updatedExisting) res.status(200).send(value);
    else res.status(201).send(value);

  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/users', async (req, res) => {
  const { email, stocks } = req.body;

  try {
    const result = await User.findOneAndUpdate({ email }, { stocks }, { upsert: true, rawResult: true });
    const { value, lastErrorObject } = result;

    if (lastErrorObject.updatedExisting) res.status(200).send(value);
    else res.status(201).send(value);

  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/users', async (req, res) => {
  const { user, stocks } = req.body;
  const { email } = user;

  try {
    const result = await User.findOneAndUpdate({ email }, { stocks }, { upsert: true, rawResult: true });
    const { value, lastErrorObject } = result;

    if (lastErrorObject.updatedExisting) res.status(200).send(value);
    else res.status(201).send(value);

  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});