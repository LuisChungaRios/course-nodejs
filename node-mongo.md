# Guía Node.js + MongoDB

---

## 1. ¿Qué es MongoDB?

MongoDB es una base de datos NoSQL orientada a documentos, ideal para almacenar datos flexibles en formato JSON. No requiere esquemas fijos y es muy utilizada en aplicaciones modernas.

---

## 2. Instalación

### Instalar MongoDB localmente

- **Windows/Mac/Linux:**  
  Descarga desde [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Usar MongoDB con Docker

```bash
docker run -d --name mongo-db -p 27017:27017 mongo
```

---

## 3. Conectar Node.js con MongoDB

### Instalar dependencias

```bash
npm install mongodb
```

### Ejemplo de conexión

```javascript
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db('testdb');
  console.log('Conectado a MongoDB');
  // ...operaciones aquí
  await client.close();
}
main();
```

---

## 4. Operaciones CRUD básicas

### Crear (Insertar documentos)

```javascript
const usuarios = db.collection('usuarios');
await usuarios.insertOne({ nombre: 'Ana', email: 'ana@email.com' });
await usuarios.insertMany([
  { nombre: 'Luis', email: 'luis@email.com' },
  { nombre: 'Maria', email: 'maria@email.com' }
]);
```

### Leer (Consultar documentos)

```javascript
const todos = await usuarios.find().toArray();
const uno = await usuarios.findOne({ nombre: 'Ana' });
```

### Actualizar documentos

```javascript
await usuarios.updateOne(
  { nombre: 'Ana' },
  { $set: { email: 'nuevo@email.com' } }
);
```

### Eliminar documentos

```javascript
await usuarios.deleteOne({ nombre: 'Luis' });
await usuarios.deleteMany({ nombre: 'Maria' });
```

---

## 5. Consultas avanzadas

### Filtros y operadores

```javascript
const resultado = await usuarios.find({ edad: { $gte: 18 } }).toArray();
```

### Proyecciones (seleccionar campos)

```javascript
const resultado = await usuarios.find({}, { projection: { nombre: 1, _id: 0 } }).toArray();
```

### Ordenar resultados

```javascript
const resultado = await usuarios.find().sort({ nombre: 1 }).toArray();
```

### Limitar resultados

```javascript
const resultado = await usuarios.find().limit(5).toArray();
```

---

## 6. Índices

```javascript
await usuarios.createIndex({ email: 1 }, { unique: true });
```

---

## 7. Agregaciones

```javascript
const resultado = await usuarios.aggregate([
  { $match: { edad: { $gte: 18 } } },
  { $group: { _id: '$ciudad', total: { $sum: 1 } } }
]).toArray();
```

---

## 8. Buenas prácticas

- Usa índices para mejorar el rendimiento de consultas.
- Valida los datos antes de insertarlos.
- Maneja la conexión correctamente (abre y cierra).
- Usa variables de entorno para la URI de conexión.
- Estructura tu código en controladores y modelos.

---

## 9. Recursos

- [Documentación oficial MongoDB](https://mongodb.com/docs/)
- [Driver oficial Node.js](https://mongodb.github.io/node-mongodb-native/)