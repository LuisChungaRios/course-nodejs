# Guía de Node.js

## 1. Introducción a Node.js
Node.js es un entorno de ejecución para JavaScript en el servidor, basado en el motor V8 de Chrome. Permite crear aplicaciones rápidas y escalables.

---

## 2. Fundamentos de JavaScript

### 2.1. Tipos de datos

- **String**: Cadena de texto  
  ```javascript
  let nombre = "Juan";
  ```
- **Number**: Números  
  ```javascript
  let edad = 25;
  ```
- **Boolean**: Verdadero o falso  
  ```javascript
  let activo = true;
  ```
- **Array**: Lista de valores  
  ```javascript
  let lista = [1, 2, 3];
  ```
- **Object**: Colección de pares clave-valor  
  ```javascript
  let persona = { nombre: "Ana", edad: 30 };
  ```
- **Null** y **Undefined**  
  ```javascript
  let nada = null;
  let indefinido;
  ```

### 2.2. Operadores básicos

- **Aritméticos**: `+`, `-`, `*`, `/`, `%`
- **Asignación**: `=`, `+=`, `-=`, `*=`, `/=`
- **Comparación**: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- **Lógicos**: `&&` (AND), `||` (OR), `!` (NOT)

```javascript
let a = 10, b = 5;
console.log(a > b && b > 0); // true
```

### 2.3. Estructuras de control

- **Condicionales**
  ```javascript
  if (a > b) {
    console.log("a es mayor");
  } else {
    console.log("b es mayor");
  }
  ```
- **Bucles**
  ```javascript
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  ```

### 2.4. Diferencia entre var, let y const

- **var**: Tiene alcance de función y permite redeclaración. No se recomienda su uso en código moderno.
- **let**: Tiene alcance de bloque y permite reasignación, pero no redeclaración en el mismo bloque.
- **const**: Tiene alcance de bloque y no permite reasignación ni redeclaración. Se usa para valores constantes.

```javascript
var x = 1;
let y = 2;
const z = 3;
```

---

## 3. Instalación de Node.js

1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión LTS para tu sistema operativo.
3. Instala siguiendo las instrucciones.
4. Verifica la instalación:
   ```bash
   node -v
   npm -v
   ```

---

## 4. Primeros pasos

Crea un archivo `app.js`:
```javascript
console.log('¡Hola, Mundo desde Node.js!');
```
Ejecuta:
```bash
node app.js
```

---

## 5. Módulos en Node.js

### 5.1. Módulos propios
`math.js`:
```javascript
function sumar(a, b) {
  return a + b;
}
module.exports = { sumar };
```
`app.js`:
```javascript
const { sumar } = require('./math');
console.log(sumar(2, 3));
```

### 5.2. Módulos nativos
```javascript
const fs = require('fs');
fs.writeFileSync('test.txt', 'Hola Node!');
```

---

## 6. NPM y paquetes

- Instala paquetes:
  ```bash
  npm init -y
  npm install express
  ```
- Usa paquetes:
  ```javascript
  const express = require('express');
  const app = express();
  app.get('/', (req, res) => res.send('Hola Express!'));
  app.listen(3000);
  ```

---

## 7. Programación asíncrona

>Node.js es asíncrono. Utiliza un modelo de ejecución basado en eventos y callbacks, lo que permite manejar muchas operaciones al mismo tiempo sin detener el servidor. Esto hace que Node.js sea muy eficiente para aplicaciones que requieren manejar múltiples conexiones o tareas simultáneas, como servidores web y APIs.

### 7.1. Callbacks

Un **callback** es una función que se pasa como argumento a otra función y se ejecuta después de que ocurre una operación asíncrona, como leer un archivo o consultar una base de datos. Los callbacks permiten que el programa siga ejecutándose mientras espera el resultado de la operación, pero pueden hacer que el código sea difícil de leer cuando se encadenan muchos callbacks (lo que se conoce como "callback hell").

```javascript
fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 7.2. Promesas

Las **promesas** existen para mejorar la gestión de operaciones asíncronas y evitar el "callback hell". Una promesa representa un valor que estará disponible en el futuro, permitiendo encadenar acciones y manejar errores de forma más clara.

- Una promesa puede estar en uno de tres estados: pendiente, cumplida o rechazada.
- Se usan los métodos `.then()` para manejar el resultado y `.catch()` para manejar errores.

```javascript
const fs = require('fs/promises');
fs.readFile('test.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 7.3. async/await

El uso de **async/await** simplifica aún más el trabajo con promesas, permitiendo escribir código asíncrono que parece síncrono y es más fácil de leer.

- `async` se coloca antes de una función para indicar que retorna una promesa.
- `await` se usa dentro de funciones `async` para esperar el resultado de una promesa antes de continuar con la siguiente línea de código.

**¿Por qué es necesario poner `await`?**  
`await` pausa la ejecución de la función hasta que la promesa se resuelva, permitiendo trabajar con el resultado como si fuera una operación normal. Sin `await`, el código seguiría ejecutándose sin esperar el resultado, lo que podría causar errores o resultados inesperados.

```javascript
const fs = require('fs/promises');
async function leerArchivo() {
  try {
    const data = await fs.readFile('test.txt', 'utf8'); // Espera el resultado
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
leerArchivo();
```

**Resumen de conceptos:**
- Los callbacks permiten ejecutar código después de una operación asíncrona, pero pueden complicar la estructura del programa.
- Las promesas facilitan el manejo de asincronía y errores, haciendo el código más limpio.
- `async/await` permite escribir código asíncrono de forma más sencilla y legible, esperando resultados de promesas como si fueran operaciones normales.

---
---

## 8. Servidores HTTP

```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Servidor Node.js');
});
server.listen(3000);
```

---

## 9. Express.js (Framework)

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hola Express!'));
app.listen(3000, () => console.log('Servidor en puerto 3000'));
```

---

## 10. Manejo de rutas y parámetros

```javascript
app.get('/saludo/:nombre', (req, res) => {
  res.send(`Hola ${req.params.nombre}`);
});
```

---

## 11. Middleware

```javascript
app.use(express.json());
app.post('/data', (req, res) => {
  res.json(req.body);
});
```

---

## 12. Conexión a bases de datos (Ejemplo con MongoDB)

```bash
npm install mongoose
```
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
```

---

## 13. Buenas prácticas

- Usa control de versiones (Git).
- Organiza el código en módulos.
- Maneja errores con try/catch.
- Usa variables de entorno (`dotenv`).
- Escribe pruebas automatizadas.

---

## 14. Temas avanzados

- Streams y buffers.
- Eventos (`EventEmitter`).
- Autenticación y JWT.
- Despliegue en servicios cloud (Heroku, Vercel).
- Testing con Jest o Mocha.

---

## 15. Recursos

- [Documentación oficial Node.js](https://nodejs.org/en/docs/)
- [Guía Express](https://expressjs.com/es/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)


## 16. Módulos internos y externos populares en Node.js (con ejemplos)

### Módulos internos (nativos)
Estos vienen incluidos con Node.js y no requieren instalación adicional:

- **fs**: Manejo de archivos (lectura, escritura, etc.)
  ```javascript
  const fs = require('fs');
  fs.writeFileSync('archivo.txt', 'Hola desde Node!');
  const contenido = fs.readFileSync('archivo.txt', 'utf8');
  console.log(contenido);
  ```
- **http**: Crear servidores web.
  ```javascript
  const http = require('http');
  const server = http.createServer((req, res) => {
    res.end('Servidor HTTP con Node.js');
  });
  server.listen(3000);
  ```
- **path**: Manejo de rutas de archivos y directorios.
  ```javascript
  const path = require('path');
  const ruta = path.join(__dirname, 'archivo.txt');
  console.log(ruta);
  ```
- **os**: Información del sistema operativo.
  ```javascript
  const os = require('os');
  console.log(os.platform());
  console.log(os.cpus());
  ```
- **events**: Manejo de eventos personalizados.
  ```javascript
  const EventEmitter = require('events');
  const emisor = new EventEmitter();
  emisor.on('saludo', nombre => {
    console.log(`Hola, ${nombre}`);
  });
  emisor.emit('saludo', 'Luis');
  ```
- **crypto**: Funciones de cifrado y hash.
  ```javascript
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update('texto').digest('hex');
  console.log(hash);
  ```
- **util**: Funciones utilitarias.
  ```javascript
  const util = require('util');
  const texto = util.format('Hola %s', 'Node.js');
  console.log(texto);
  ```
- **stream**: Manejo de flujos de datos.
  ```javascript
  const fs = require('fs');
  const stream = fs.createReadStream('archivo.txt');
  stream.on('data', chunk => {
    console.log('Chunk recibido:', chunk.toString());
  });
  ```

### Módulos externos (instalados con npm)
Estos se instalan usando npm y son ampliamente usados en la comunidad:

- **express**: Framework para crear servidores web y APIs.
  ```bash
  npm install express
  ```
  ```javascript
  const express = require('express');
  const app = express();
  app.get('/', (req, res) => res.send('Hola Express!'));
  app.listen(3000);
  ```
- **mongoose**: ODM para MongoDB.
  ```bash
  npm install mongoose
  ```
  ```javascript
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');
  ```
- **dotenv**: Manejo de variables de entorno.
  ```bash
  npm install dotenv
  ```
  ```javascript
  require('dotenv').config();
  console.log(process.env.MI_VARIABLE);
  ```
- **nodemon**: Reinicio automático del servidor en desarrollo.
  ```bash
  npm install --save-dev nodemon
  ```
  Ejecuta el servidor automáticamente al guardar cambios:
  ```bash
  npx nodemon app.js
  ```
- **cors**: Middleware para habilitar CORS.
  ```bash
  npm install cors
  ```
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```
- **body-parser**: Middleware para procesar cuerpos de solicitudes HTTP.
  ```bash
  npm install body-parser
  ```
  ```javascript
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  ```
- **jsonwebtoken**: Manejo de autenticación con JWT.
  ```bash
  npm install jsonwebtoken
  ```
  ```javascript
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ usuario: 'Luis' }, 'secreto');
  console.log(token);
  ```
- **bcrypt**: Encriptación de contraseñas.
  ```bash
  npm install bcrypt
  ```
  ```javascript
  const bcrypt = require('bcrypt');
  const hash = bcrypt.hashSync('contraseña', 10);
  console.log(hash);
  ```
- **axios**: Cliente HTTP para hacer peticiones a APIs.
  ```bash
  npm install axios
  ```
  ```javascript
  const axios = require('axios');
  axios.get('https://api.github.com').then(res => console.log(res.data));
  ```
- **jest** o **mocha**: Frameworks para pruebas automatizadas.
  ```bash
  npm install --save-dev jest
  npm install --save-dev mocha
  ```
  Ejemplo de test con Jest:
  ```javascript
  test('suma', () => {
    expect(2 + 2).toBe(4);
  });
  ```
- **multer**: Manejo de archivos subidos por el usuario.
  ```bash
  npm install multer
  ```
  ```javascript
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  app.post('/subir', upload.single('archivo'), (req, res) => {
    res.send('Archivo subido');
  });
  ```

---

Estos módulos y paquetes son la base para la mayoría de proyectos Node.js, tanto para desarrollo web como para utilidades y