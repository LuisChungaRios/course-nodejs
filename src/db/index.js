const dotenv = require('dotenv');
dotenv.config();
const type = process.env.DB_TYPE || 'mysql';

let adapter;
if (type === 'mysql') {
  console.log('Using MySQL adapter');
  adapter = require('./adapters/mysql.js');
} else if (type === 'postgres') {
  adapter = require('./adapters/postgres.js');
} else if (type === 'mongo') {
  adapter = require('./adapters/mongo.js');
} else {
  throw new Error(`Unknown database type: ${type}`);
}
module.exports = adapter;