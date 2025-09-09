const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

require('dotenv').config();// Cargar variables de entorno

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la conexión

console.log(process.env)

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_DATABASE || 3306,
};

// CRUD de usuarios

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM usuarios');
  await conn.end();
  res.json(rows);
});

// Obtener usuario por ID
app.get('/usuarios/:id', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
  await conn.end();
  if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(rows[0]);
});

// Crear usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, email } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  const [result] = await conn.execute('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email]);
  await conn.end();
  res.json({ id: result.insertId, nombre, email });
});

// Actualizar usuario
app.put('/usuarios/:id', async (req, res) => {
  const { nombre, email } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, req.params.id]);
  await conn.end();
  res.json({ id: req.params.id, nombre, email });
});

// Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
  await conn.end();
  res.json({ mensaje: 'Usuario eliminado' });
});

app.listen(3000, () => {
  console.log('Servidor Express escuchando en puerto 3000');
});