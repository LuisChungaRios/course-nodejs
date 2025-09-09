const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'secret',
  database: process.env.POSTGRES_DB || 'appdb',
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432
});

module.exports = {
  connect: async () => {
    // create table if not exists
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE
    )`);
    console.log('Postgres connected');
  },
  disconnect: async () => { await pool.end(); },
  createUser: async (data) => {
    const res = await pool.query('INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *', [data.name, data.email]);
    return res.rows[0];
  },
  getUsers: async () => {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  },
  getUserById: async (id) => {
    const res = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    return res.rows[0] || null;
  },
  updateUser: async (id, data) => {
    const res = await pool.query('UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *', [data.name, data.email, id]);
    return res.rows[0];
  },
  deleteUser: async (id) => {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    return { deleted: true };
  }
};
