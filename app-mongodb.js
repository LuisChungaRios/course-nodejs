const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();// Cargar variables de entorno

const url = process.env.MONGO_URL || `mongodb://root:example@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
console.log('MongoDB URL:', url);
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});
let User;

const app = express();
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(url);
    User = mongoose.models.User || mongoose.model('User', userSchema);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error);
  }
};


// CRUD de users

// Obtener todos los users
app.get('/users', async (req, res) => {
  await connect();
  console.log('Fetching all users from MongoDB');
  let results = await User.find().lean();
  await disconnect();
  res.json(results);
});

// Obtener usuario por ID
app.get('/users/:id', async (req, res) => {
  let id = req.params.id;
  await connect();
  let result = await User.findById(id).lean();
  await disconnect();
  console.log('Fetching user by ID from MongoDB:', id, result);

  if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(result);
});

// Crear usuario
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  await connect();
  const u = new User({
    name,
    email
  });
  await u.save();
  let result = u.toObject();
  await disconnect();
  res.json(result);
});

// Actualizar usuario
app.put('/users/:id', async (req, res) => {
  let id = req.params.id;
  const { name, email } = req.body;
  await connect();
  let result = await User.findByIdAndUpdate(id, { name, email }, { new: true, lean: true });

  await disconnect();
  res.json(result);
});

// Eliminar usuario
app.delete('/users/:id', async (req, res) => {
  let id = req.params.id;
  await connect();
  await User.findByIdAndDelete(id);
  await disconnect();
  res.json({ mensaje: 'Usuario eliminado' });
});

app.listen(3000, () => {
  console.log('Servidor Express escuchando en puerto 3000');
});