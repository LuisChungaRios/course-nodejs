const mysql = require('mysql2/promise');
const config = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_DATABASE || 'appdb',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
};
let pool;

module.exports = {
  connect: async () => {
    pool = await mysql.createPool({ ...config, waitForConnections: true, connectionLimit: 10 });
    // create table if not exists
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE
    )`);
    console.log('MySQL connected');
  },
  disconnect: async () => { await pool.end(); },
  createUser: async (data) => {
    const [res] = await pool.query('INSERT INTO users (name,email) VALUES (?,?)', [data.name, data.email]);
    return { id: res.insertId, ...data };
  },
  getUsers: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },
  getUserById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
    return rows[0] || null;
  },
  updateUser: async (id, data) => {
    await pool.query('UPDATE users SET name=?, email=? WHERE id=?', [data.name, data.email, id]);
    return await (await pool.query('SELECT * FROM users WHERE id=?', [id]))[0][0];
  },
  deleteUser: async (id) => {
    await pool.query('DELETE FROM users WHERE id=?', [id]);
    return { deleted: true };
  }
};
