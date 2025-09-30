const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;
console.log('SECRET_KEY', SECRET_KEY);
let users = [];


app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña requeridos" });
  }

  // Verificar si ya existe
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: "El usuario ya existe" });
  }

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  users = [...users, { username, password: hashedPassword }];
  console.log('users', JSON.stringify(users));
  res.json({ message: "Usuario registrado con éxito" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Comparar contraseña
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Generar token JWT (expira en 1 hora)
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "Login exitoso", token });
});

// 🛡 Middleware para verificar el token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) return res.status(403).json({ error: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = user; // guardamos los datos del token
    next();
  });
}

app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.username}, esta es tu ruta protegida!` });
});


// 🚀 Iniciar servidor

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
