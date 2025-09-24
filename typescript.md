# 📘 Guía de TypeScript

## 1. Introducción
**TypeScript** es un superset de JavaScript que agrega **tipos estáticos**.  
El código TypeScript se **transpila** a JavaScript, lo que permite usarlo en cualquier entorno donde corre JS.

**Instalación:**
```bash
npm install -g typescript
tsc --version
```

Crear un proyecto:
```bash
mkdir proyecto-ts
cd proyecto-ts
npm init -y
npm install typescript --save-dev
npx tsc --init
```

## 2. Tipos básicos
### 2.1 Variables tipadas
```ts
let nombre: string = "Luis";
let edad: number = 30;
let isActive: boolean = true;
```

### 2.2 Arreglos y Tuplas
```ts
let numeros: number[] = [1, 2, 3];
let colores: Array<string> = ["rojo", "verde"];

let tupla: [string, number] = ["edad", 25];
```

### 2.3 Tipos especiales
```ts
let sinValor: void = undefined;
let cualquiera: any = "puede ser cualquier cosa";
let desconocido: unknown = "debes verificar antes de usarlo";
let nulo: null = null;
let indefinido: undefined = undefined;
```
## 3. Funciones
```ts
function sumar(a: number, b: number): number {
  return a + b;
}

const restar = (a: number, b: number): number => a - b;
```
### 3.1 Parámetros opcionales y por defecto:
```ts
function saludar(nombre: string, saludo: string = "Hola"): string {
  return `${saludo}, ${nombre}`;
}

function info(nombre: string, edad?: number) {
  console.log(nombre, edad);
}
```

## 4. Objetos y Tipos Personalizados
### 4.1 Interfaces
```ts
interface Persona {
  nombre: string;
  edad: number;
  activo?: boolean; // opcional
}

const usuario: Persona = { nombre: "Luis", edad: 25 };
```

## 4.2 Type Alias
```ts
type Documento = "DNI" | "PASAPORTE";

interface Usuario {
  nombre: string;
  documento: Documento;
}
```

## 5. Clases y Modificadores de acceso
```ts
class Animal {
  private nombre: string;
  protected especie: string;
  public edad: number;

  constructor(nombre: string, especie: string, edad: number) {
    this.nombre = nombre;
    this.especie = especie;
    this.edad = edad;
  }

  info(): string {
    return `${this.nombre} (${this.especie}) tiene ${this.edad} años.`;
  }
}

const perro = new Animal("Firulais", "Perro", 5);
console.log(perro.info());
```

## 6. Genéricos
Sirven para crear código reutilizable con tipos flexibles.

```ts
function identidad<T>(valor: T): T {
  return valor;
}

let salida1 = identidad<string>("Hola");
let salida2 = identidad<number>(123);
```
### 6.1 Con interfaces:
```ts
interface Respuesta<T> {
  data: T;
  ok: boolean;
}

const resp: Respuesta<number[]> = {
  data: [1, 2, 3],
  ok: true,
};
```
## 7. Enumeraciones (Enums)
```ts
enum Rol {
  Admin = "ADMIN",
  Usuario = "USUARIO",
  Invitado = "INVITADO"
}

let miRol: Rol = Rol.Admin;
```
## 8. Módulos y Exportaciones
math.ts:

```ts
export function sumar(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14;
app.ts:
```

```ts
import { sumar, PI } from "./math";

console.log(sumar(2, 3));
console.log("PI =", PI);
```

## 9. Tipos Avanzados
### 9.1 Uniones e Intersecciones
```ts
type Id = string | number;

type A = { a: string };
type B = { b: number };
type AB = A & B; // Intersección
```

## 9.2 Tipos condicionales
```ts
type EsNumero<T> = T extends number ? "Sí" : "No";
type Res1 = EsNumero<number>; // "Sí"
type Res2 = EsNumero<string>; // "No"
```

## 10. Utilitarios comunes
TypeScript incluye tipos utilitarios listos para usar:

```ts
Copiar código
interface Usuario {
  id: number;
  nombre: string;
  email?: string;
}

type SoloLectura = Readonly<Usuario>;
type Parcial = Partial<Usuario>;
type Obligatorio = Required<Usuario>;
type SoloNombre = Pick<Usuario, "nombre">;
type SinEmail = Omit<Usuario, "email">;
```

## 11. Manejo de Promesas y Async/Await
```ts
async function obtenerDatos(): Promise<string[]> {
  return ["dato1", "dato2"];
}

obtenerDatos().then(d => console.log(d));
```

## 12. Configuración básica tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

## 13. Compilar y Ejecutar
Compilar: npx tsc

Ejecutar con Node: node dist/app.js

Ejecutar directamente con TS (ts-node):

```bash
npm install -g ts-node
npx ts-node src/app.ts
```

## 14. Recursos recomendados

<!-- agrega los links -->
[Documentación oficial TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)

[Playground de TypeScript](https://www.typescriptlang.org/play)

