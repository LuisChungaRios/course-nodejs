# 🐳 Guía Completa de Docker Compose

## 1. Introducción a Docker Compose

Docker Compose es una herramienta que permite definir y ejecutar aplicaciones multi-contenedor usando archivos YAML. Sus ventajas principales:

- **Definir servicios, redes y volúmenes** en un solo archivo (`docker-compose.yml`)
- **Levantar toda la aplicación** con un solo comando:
  ```sh
  docker compose up
  ```
- **Facilita el desarrollo local** y la integración de microservicios

---

## 2. Instalación de Docker Compose

- **Windows/Mac:** Docker Compose ya viene incluido con Docker Desktop.
- **Linux:** Verifica la instalación con:
  ```sh
  docker compose version
  ```
  Si no está instalado, sigue la [guía oficial](https://docs.docker.com/compose/install/).

---

## 3. Primer Ejemplo Básico

**Estructura de archivos:**
```
myapp/
  ├── docker-compose.yml
  └── app/
      └── index.html
```

**Contenido de `docker-compose.yml`:**
```yaml
version: "3.9"
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./app:/usr/share/nginx/html
```

**Comandos útiles:**
```sh
docker compose up       # Levanta el servicio
docker compose down     # Apaga y elimina contenedores
```

Accede a: [http://localhost:8080](http://localhost:8080)

---

## 4. Conceptos Clave

| Concepto    | Explicación                                               |
|-------------|----------------------------------------------------------|
| **Service** | Un contenedor que define tu aplicación (ej. web, DB)     |
| **Image**   | Plantilla base del contenedor (ej. nginx:alpine, mysql)  |
| **Volume**  | Almacenamiento persistente                               |
| **Network** | Comunicación entre servicios                             |
| **Environment** | Variables de entorno (usuario, contraseñas, etc.)    |

---

## 5. Variables de Entorno

Usa variables para evitar credenciales en el `docker-compose.yml`.

**Archivo `.env`:**
```
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=testdb
```

**Archivo `docker-compose.yml`:**
```yaml
version: "3.9"
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "3306:3306"
```

---

## 6. Redes y Comunicación

Docker Compose crea una red interna para que los servicios se comuniquen por nombre.

**Ejemplo:**
```yaml
version: "3.9"
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: testdb
```
El servicio `web` puede acceder a la DB usando el host `db`.

---

## 7. Volúmenes

Para persistir datos entre reinicios de contenedores:

```yaml
version: "3.9"
services:
  db:
    image: mysql:8
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

---

## 8. Comandos Útiles

| Comando                           | Descripción                              |
|------------------------------------|------------------------------------------|
| `docker compose up -d`             | Levanta contenedores en segundo plano    |
| `docker compose down -v`           | Borra contenedores y volúmenes           |
| `docker compose ps`                | Lista contenedores activos               |
| `docker compose logs -f`           | Ver logs en tiempo real                  |
| `docker compose exec <svc> sh`     | Entrar al contenedor                     |

---

## 9. Ejemplo Intermedio: Web + DB + phpMyAdmin

```yaml
version: "3.9"
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - mynet

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
    networks:
      - mynet

  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - mynet

volumes:
  db_data:

networks:
  mynet:
```

- **Web:** [http://localhost:8080](http://localhost:8080)
- **phpMyAdmin:** [http://localhost:8081](http://localhost:8081)

---

## 10. Ejemplo Avanzado: Microservicios con Dependencias

```yaml
version: "3.9"
services:
  api:
    build: ./api
    depends_on:
      - db
    environment:
      DB_HOST: db
    networks:
      - backend

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    networks:
      - backend

volumes:
  pgdata:

networks:
  backend:
```

> `depends_on` asegura que la DB esté lista antes del API.

---

## 11. Buenas Prácticas

- Usa `.env` para variables sensibles
- Volúmenes para persistir datos
- Una red por aplicación para aislar servicios
- Logs centralizados si la app es grande
- Dockerfile optimizado para producción

