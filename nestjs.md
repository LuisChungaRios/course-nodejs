# 🚀 Guía NestJS

NestJS es un framework para construir aplicaciones del lado del servidor eficientes y escalables con **Node.js** y **TypeScript**, basado en una arquitectura modular y orientada a controladores y servicios.

---

## 📦 1. Requisitos Previos

Antes de empezar, asegúrate de tener:
- **Node.js** >= 16
- **npm** o **yarn**
- Conocimientos básicos de:
  - JavaScript/TypeScript
  - Programación orientada a objetos
  - HTTP y REST APIs

Verifica la versión de Node:
```bash
node -v 
```
Verifica la versión de npm:
```bash
npm -v
```

## 📦 2. Instalación del CLI de NestJS

```bash
npm i -g @nestjs/cli
```

Verifica la instalación:

```bash
nest --version
```

## 3. Creación de una Aplicación NestJS

Crea una nueva aplicación NestJS:

```bash
nest new my-nest-app
```

Esto generará una estructura de proyecto básica con los siguientes archivos y carpetas:

```
my-nest-app/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── .eslintrc.js
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

> Que es un controller ?
  Un controlador es una clase que define las rutas y manejadores de solicitudes HTTP. Cada controlador está asociado a un módulo y se encarga de manejar las solicitudes entrantes para una parte específica de la aplicación.

> Que es un service ?
  Un servicio es una clase que contiene la lógica de negocio de la aplicación. Se utiliza para encapsular la funcionalidad y separar la lógica de la aplicación de la lógica de presentación. Los servicios se inyectan en los controladores para que puedan ser utilizados para manejar las solicitudes entrantes.

> Que es un module ?
  Un módulo es una clase decorada con el decorador `@Module()`. Se utiliza para organizar la aplicación en bloques funcionales y reutilizables. Cada módulo define su propio conjunto de controladores, servicios y proveedores.



## 4. Creación de un Controlador
Crea un nuevo controlador llamado `users`:

```bash
nest generate controller users
```

Esto generará un archivo `users.controller.ts` en la carpeta `src/users`.

> Que es un decorador ?
  Un decorador es una función que se utiliza para modificar el comportamiento de una clase, método o propiedad. En NestJS, se utilizan decoradores para definir rutas, controladores, servicios y módulos.

> Que es un decorador de ruta ?
  Un decorador de ruta es un decorador que se utiliza para definir la ruta de una solicitud HTTP. Se utiliza para mapear una solicitud entrante a un controlador y un método específico.

> Que es un decorador de método ?
  Un decorador de método es un decorador que se utiliza para definir el método HTTP (GET, POST, PUT, DELETE, etc.) que se utilizará para manejar una solicitud entrante.

Edita el archivo `users.controller.ts` para definir una ruta GET:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'This action returns all users';
  }
}
```
## 5. Creación de un Servicio
Crea un nuevo servicio llamado `users`:

```bash
nest generate service users
```

Esto generará un archivo `users.service.ts` en la carpeta `src/users`.

> Que es un decorador de servicio ?
  Un decorador de servicio es un decorador que se utiliza para definir un servicio en NestJS. Se utiliza para inyectar servicios en controladores y otros servicios.

> Que es un decorador de proveedor ?
  Un decorador de proveedor es un decorador que se utiliza para definir un proveedor en NestJS. Se utiliza para inyectar servicios y otros proveedores en controladores y otros servicios.

Edita el archivo `users.service.ts` para agregar una función `getUsers()`:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    return 'This action returns all users';
  }
}
```

## 6. Inyección de Dependencias
Inyecta el servicio `UsersService` en el controlador `UsersController`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
```

> Que es injeccion de dependencia ?
  Inyección de dependencia es un patrón de diseño que se utiliza para proporcionar objetos (dependencias) a otras clases sin que las clases tengan que crearlas o gestionarlas directamente. En NestJS, la inyección de dependencia se realiza mediante la inyección de constructores.

## 7. DTO y Validacion

Crea un DTO para la creación de usuarios:

Crea un archivo `users.dto.ts` para definir la estructura del DTO:

```typescript
import { IsString, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
```

> Que es un DTO ?
  Un DTO (Data Transfer Object) es un objeto que se utiliza para transferir datos entre diferentes capas de una aplicación. Se utiliza para definir la estructura de los datos que se envían y reciben a través de la API.

> Que es la validacion ?
  La validación es el proceso de verificar que los datos que se reciben a través de la API cumplan con los requisitos especificados. En NestJS, se puede utilizar la validación de datos mediante decoradores y pipes.

## 8. Validación de DTO

Edita el archivo `users.controller.ts` para agregar la validación del DTO:

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
```

Edita el archivo `users.service.ts` para agregar la función `createUser()`:

```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
```
## 9. Middleware
Crea un middleware para registrar las solicitudes entrantes:
Crea un archivo `logger.middleware.ts` para definir el middleware:

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
}
```

Registra el middleware en el módulo principal `app.module.ts`:

```typescript
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```
## 10 Pipes - Interceptors

> Que es un pipe ?
  Un pipe es un mecanismo que se utiliza para transformar y validar datos entrantes en una solicitud HTTP. En NestJS, se pueden utilizar pipes para transformar datos, validar datos y manejar errores.

> Que es un interceptor ?
  Un interceptor es un mecanismo que se utiliza para interceptar y modificar las solicitudes y respuestas HTTP. En NestJS, se pueden utilizar interceptores para agregar funcionalidad común, como registro, caché y transformación de respuestas.

## 11. Ejecutar la Aplicación
Ejecuta la aplicación:

```bash
npm run start
```

La aplicación estará disponible en `http://localhost:3000`.

