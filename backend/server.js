const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // You can remove bodyParser as it's not needed with express.json()
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
app.use(methodOverride('_method'));

// Remove bodyParser and use express.json() instead
app.use(express.json({ limit: '10mb' })); // Use express.json() to parse JSON data
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({ origin: process.env.ORIGIN }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to the database');
  }
});

// Route Files
const route = require('./routes/routes');

// Routes
app.use('/api', route);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API on port ${PORT}`);
});
