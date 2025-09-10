# Guía de MySQL

---

## 1. ¿Qué es MySQL?

MySQL es un sistema de gestión de bases de datos relacional (RDBMS) muy popular, usado para almacenar y consultar datos de forma estructurada.

---

## 2. Instalación

- **Windows/Mac:** Descarga desde [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
- **Linux:**  
  ```bash
  sudo apt update
  sudo apt install mysql-server
  ```

---
## 3. Comandos básicos

### Conexión

```bash
mysql -u root -p
```
- `-u root`: Indica el usuario con el que te conectas (por defecto, `root`).
- `-p`: Solicita la contraseña del usuario.

---

### Crear base de datos

```sql
CREATE DATABASE tienda;
USE tienda;
```
- `CREATE DATABASE tienda;`: Crea una base de datos llamada `tienda`.
- `USE tienda;`: Selecciona la base de datos `tienda` para trabajar con ella.

---

### Crear tabla

```sql
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);
```
- `id INT AUTO_INCREMENT PRIMARY KEY`: Crea una columna `id` que se incrementa automáticamente y es clave primaria.
- `nombre VARCHAR(100) NOT NULL`: Columna de texto de hasta 100 caracteres, obligatoria.
- `precio DECIMAL(10,2) NOT NULL`: Columna numérica con 2 decimales, obligatoria.
- `stock INT DEFAULT 0`: Columna numérica entera, valor por defecto 0.

---

### Insertar datos

```sql
INSERT INTO productos (nombre, precio, stock) VALUES
('Laptop', 2500.00, 10),
('Mouse', 25.50, 100);
```
- Inserta dos productos con sus respectivos valores en la tabla `productos`.

---

### Consultar datos

```sql
SELECT * FROM productos;
SELECT nombre, precio FROM productos WHERE stock > 50;
```
- `SELECT * FROM productos;`: Muestra todos los registros y columnas de la tabla.
- `SELECT nombre, precio FROM productos WHERE stock > 50;`: Muestra solo el nombre y precio de los productos con stock mayor a 50.

---

### Actualizar datos

```sql
UPDATE productos SET stock = stock - 1 WHERE id = 1;
```
- Disminuye en 1 el stock del producto cuyo `id` es 1.

---

### Eliminar datos

```sql
DELETE FROM productos WHERE id = 2;
```
- Elimina el producto cuyo `id` es 2 de la table

---



## 4. Consultas avanzadas

### Ordenar resultados

```sql
SELECT * FROM productos ORDER BY precio DESC;
```

### Limitar resultados

```sql
SELECT * FROM productos LIMIT 5;
```

### Funciones agregadas

```sql
SELECT COUNT(*) FROM productos;
SELECT AVG(precio) FROM productos;
```

### Agrupar resultados

```sql
SELECT stock, COUNT(*) FROM productos GROUP BY stock;
```

### Joins (Uniones)

```sql
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50)
);

ALTER TABLE productos ADD categoria_id INT;

SELECT productos.nombre, categorias.nombre AS categoria
FROM productos
JOIN categorias ON productos.categoria_id = categorias.id;
```

---

## 5. Índices y claves

### Índice

```sql
CREATE INDEX idx_nombre ON productos(nombre);
```

### Clave foránea

```sql
ALTER TABLE productos
ADD CONSTRAINT fk_categoria
FOREIGN KEY (categoria_id) REFERENCES categorias(id);
```

---

## 6. Usuarios y permisos

### Crear usuario

```sql
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON tienda.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;
```

---

## 7. Backup y restauración

### Backup

```bash
mysqldump -u root -p tienda > tienda.sql
```

### Restaurar

```bash
mysql -u root -p tienda < tienda.sql
```

---

## 8. Buenas prácticas

- Usa claves primarias y foráneas para relaciones.
- Realiza backups periódicos.
- Usa índices para mejorar el rendimiento de consultas.
- Limita los permisos de usuarios.
- Normaliza tus tablas para evitar redundancia.

---

## 9. Recursos

- [Documentación oficial MySQL](https://dev.mysql.com/doc/)
- [Tutorial MySQL en W3Schools](https://www.w3schools.com/mysql/)

## 10. Tipos de datos
- `INT`: Números enteros.
- `VARCHAR(n)`: Cadenas de texto de longitud variable, hasta n caracteres.
- `TEXT`: Cadenas de texto largas.
- `DATE`: Fecha en formato AAAA-MM-DD.
- `DECIMAL(m,n)`: Números decimales con m dígitos en total y n dígitos después del punto decimal.
- `BOOLEAN`: Valores verdadero/falso
- `FLOAT`: Números de punto flotante.
- `TIMESTAMP`: Fecha y hora combinadas.
- `BLOB`: Datos binarios grandes (imágenes, archivos, etc.).
- `ENUM`: Lista de valores predefinidos.
- `SET`: Conjunto de valores predefinidos, permite múltiples selecciones.
- `CHAR(n)`: Cadenas de texto de longitud fija, exactamente n caracteres.
- `BIGINT`: Números enteros grandes.
- `SMALLINT`: Números enteros pequeños.
- `TINYINT`: Números enteros muy pequeños.
- `MEDIUMINT`: Números enteros de tamaño medio.
- `YEAR`: Año en formato de 4 dígitos (AAAA).
- `TIME`: Hora en formato HH:MM:SS.
- `JSON`: Datos en formato JSON.
- `GEOMETRY`: Datos espaciales (puntos, líneas, polígonos).

---

## 11. Operadores comunes
- Aritméticos: `+`, `-`, `*`, `/`, `%`
- Comparación: `=`, `!=`, `<`, `>`, `<=`, `>=`
- Lógicos: `AND`, `OR`, `NOT`
- Cadena: `LIKE`, `IN`, `BETWEEN`, `IS NULL`, `IS NOT NULL`
- Concatenación: `CONCAT()`
- Agregación: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`
- Ordenación: `ORDER BY`
- Agrupación: `GROUP BY`
- Unión: `JOIN`, `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`
- Subconsultas: Consultas dentro de otras consultas.
- Alias: `AS` para renombrar columnas o tablas en resultados.
- `DISTINCT`: Elimina duplicados en los resultados.
- `UNION`: Combina resultados de dos o más consultas.
- `EXISTS`: Verifica la existencia de filas en una subconsulta.
- `CASE`: Estructura condicional para retornar valores basados en condiciones.
- `HAVING`: Filtra resultados después de una agregación (similar a `WHERE`, pero para grupos).
- `LIMIT`: Restringe el número de filas devueltas por una consulta.
- `OFFSET`: Desplaza el inicio de los resultados devueltos por una consulta.
- `TRUNCATE`: Elimina todos los registros de una tabla sin registrar cada eliminación individualmente.
- `REPLACE`: Inserta un nuevo registro o actualiza uno existente si hay conflicto de clave primaria.
- `ALTER TABLE`: Modifica la estructura de una tabla (agregar, eliminar o modificar columnas).
- `DROP TABLE`: Elimina una tabla y todos sus datos.
- `CREATE INDEX`: Crea un índice para mejorar la velocidad de las consultas.
- `DROP INDEX`: Elimina un índice existente.
- `SHOW TABLES`: Muestra todas las tablas en la base de datos actual.
- `DESCRIBE`: Muestra la estructura de una tabla (columnas, tipos de datos, etc.).
- `EXPLAIN`: Proporciona información sobre cómo MySQL ejecuta una consulta, útil para optimización.
- `SET`: Cambia variables de configuración para la sesión actual.
- `SHOW VARIABLES`: Muestra las variables de configuración del servidor MySQL.
- `SHOW PROCESSLIST`: Muestra las consultas que se están ejecutando actualmente.
- `KILL`: Termina una consulta en ejecución utilizando su ID de proceso.
- `FLUSH`: Limpia o recarga las tablas, cachés o logs.
- `ANALYZE TABLE`: Recopila estadísticas sobre la distribución de datos en una tabla para optimización de consultas.
- `OPTIMIZE TABLE`: Reorganiza la tabla para mejorar el rendimiento.
- `CHECK TABLE`: Verifica la integridad de una tabla.
- `RENAME TABLE`: Cambia el nombre de una tabla.
- `LOAD DATA INFILE`: Carga datos desde un archivo externo a una tabla.
- `SHOW CREATE TABLE`: Muestra la sentencia SQL utilizada para crear una tabla específica.
- `SHOW INDEX`: Muestra los índices de una tabla.
- `SHOW DATABASES`: Muestra todas las bases de datos en el servidor MySQL.
- `USE`: Selecciona una base de datos para trabajar con ella.
- `SHOW COLUMNS`: Muestra las columnas de una tabla específica.
- `SHOW GRANTS`: Muestra los permisos otorgados a un usuario específico.
- `REVOKE`: Revoca permisos otorgados a un usuario.
- `ROLLBACK`: Deshace todas las operaciones realizadas en la transacción actual.
- `COMMIT`: Guarda todas las operaciones realizadas en la transacción actual.