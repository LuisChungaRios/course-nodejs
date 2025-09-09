const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const db = require('./src/db/index.js');
const userRoutes = require('./src/routes/users.js');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);

const port = process.env.PORT || 3000;

async function start() {
  try {
    await db.connect();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
}

start();
