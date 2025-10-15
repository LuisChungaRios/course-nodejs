const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;
console.log('SECRET_KEY', SECRET_KEY);
let users = [];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Autenticación con JWT',
      version: '1.0.0',
      description: 'API simple para autenticación usando JSON Web Tokens (JWT) con Express.js',
    },
  },
  apis: ['./server.js'], // Rutas a los archivos con anotaciones JSDoc
})))



/**
 * @components
 * schemas:
 *   User:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *     required:
 *       - username
 *       - password
 */

/**
 * @openapi
 * /register:
 *  post:
 *    tags: [Auth]
 *    description: Registra un nuevo usuario,
 *    summary: Registra un nuevo usuario
 *    operationId: registerUser
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Usuario registrado con éxito
 *      400:
 *        description: Error en la solicitud (usuario ya existe o datos faltantes) 
 */
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


/** * @openapi
 * /login:
 *  post:
 *    tags: [Auth]
 *    description: Inicia sesión y obtiene un token JWT
 *    summary: Inicia sesión
 *    operationId: loginUser
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Login exitoso, retorna un token JWT
 *      401:
 *        description: Credenciales inválidas
 */


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


/**
 * @openapi
 * /dashboard:
 *  get:
 *    tags: [Auth]
 *    description: Obtiene información del usuario autenticado
 *    summary: Obtiene información del usuario
 *    operationId: getDashboardInfo
 *    responses:
 *      200:
 *        description: Información del usuario autenticado
 *      403:
 *        description: Token inválido o expirado
 */
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.username}, esta es tu ruta protegida!` });
});


// 🚀 Iniciar servidor

const port = process.env.NODE_PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
