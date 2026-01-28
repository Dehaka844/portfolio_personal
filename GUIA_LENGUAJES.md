# 📚 Guía de Lenguajes y Tecnologías - Portfolio David Arenas

## 🎯 Introducción

Este proyecto utiliza varias tecnologías modernas y lenguajes de programación. Esta guía explica **qué es cada uno**, **para qué sirve**, y **cuáles son sus funciones más importantes**.

---

## 1️⃣ TypeScript

### ¿Qué es TypeScript?

**TypeScript** es una extensión de JavaScript que añade **tipos de datos**. Es como JavaScript, pero más seguro porque te obliga a especificar qué tipo de dato es cada variable.

**Analogía:** Si JavaScript es como hablar sin reglas, TypeScript es como hablar con reglas gramaticales claras.

### ¿Para qué sirve?

- Prevenir errores antes de ejecutar el código
- Hacer el código más fácil de entender
- Facilitar el trabajo en equipo
- Detectar errores automáticamente en el editor

### Funciones Más Importantes

#### 1. **Tipos Básicos**
```typescript
// Número
let edad: number = 25;

// Texto
let nombre: string = "David";

// Booleano (verdadero/falso)
let esActivo: boolean = true;

// Array
let numeros: number[] = [1, 2, 3];
let textos: Array<string> = ["a", "b"];
```

#### 2. **Interfaces** (Estructuras de Datos)
```typescript
// Define la forma de un objeto
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Ahora cualquier objeto Usuario debe tener esos campos
const usuario: Usuario = {
  id: 1,
  nombre: "David",
  email: "david@example.com"
};
```

#### 3. **Funciones Tipadas**
```typescript
// Función que recibe dos números y devuelve un número
function sumar(a: number, b: number): number {
  return a + b;
}

// Función que recibe un usuario y devuelve un texto
function saludar(usuario: Usuario): string {
  return `Hola ${usuario.nombre}`;
}
```

#### 4. **Tipos Genéricos**
```typescript
// Función que funciona con cualquier tipo de dato
function obtenerPrimero<T>(array: T[]): T {
  return array[0];
}

// Funciona con números
const num = obtenerPrimero([1, 2, 3]); // tipo: number

// Funciona con textos
const texto = obtenerPrimero(["a", "b"]); // tipo: string
```

### Ventajas en Este Proyecto

- **Seguridad:** El editor detecta errores antes de ejecutar
- **Autocompletado:** El editor sugiere propiedades y métodos
- **Refactorización:** Cambiar nombres es más seguro
- **Documentación:** Los tipos sirven como documentación

---

## 2️⃣ React

### ¿Qué es React?

**React** es una librería de JavaScript para crear **interfaces de usuario interactivas**. Te permite crear componentes reutilizables que se actualizan automáticamente cuando los datos cambian.

**Analogía:** React es como un constructor de LEGO. Creas bloques pequeños (componentes) y los combinas para hacer cosas más grandes (páginas).

### ¿Para qué sirve?

- Crear páginas web dinámicas e interactivas
- Reutilizar código mediante componentes
- Actualizar la página automáticamente sin recargar
- Gestionar el estado de la aplicación

### Funciones Más Importantes

#### 1. **Componentes Funcionales**
```typescript
// Un componente es una función que devuelve HTML
function Saludo() {
  return <h1>Hola, mundo</h1>;
}

// Componente con propiedades (props)
function Bienvenida(props: { nombre: string }) {
  return <h1>Hola, {props.nombre}</h1>;
}

// Uso del componente
<Bienvenida nombre="David" />
```

#### 2. **Estado (useState)**
```typescript
import { useState } from 'react';

function Contador() {
  // count = valor actual, setCount = función para cambiar
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

#### 3. **Efectos (useEffect)**
```typescript
import { useEffect, useState } from 'react';

function MiComponente() {
  const [datos, setDatos] = useState(null);

  // Se ejecuta cuando el componente se monta
  useEffect(() => {
    // Cargar datos desde un servidor
    fetch('/api/datos')
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []); // [] significa que solo se ejecuta una vez

  return <div>{datos}</div>;
}
```

#### 4. **Condicionales en JSX**
```typescript
function MostrarMensaje(props: { usuario: Usuario | null }) {
  return (
    <div>
      {props.usuario ? (
        <p>Bienvenido, {props.usuario.nombre}</p>
      ) : (
        <p>Por favor, inicia sesión</p>
      )}
    </div>
  );
}
```

#### 5. **Listas (map)**
```typescript
function ListaUsuarios(props: { usuarios: Usuario[] }) {
  return (
    <ul>
      {props.usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.nombre}</li>
      ))}
    </ul>
  );
}
```

### Ventajas en Este Proyecto

- **Componentes reutilizables:** La página de inicio, Proyecto 1 y Proyecto 2 son componentes
- **Reactividad:** La interfaz se actualiza automáticamente
- **Fácil de mantener:** Cada componente tiene una responsabilidad clara
- **Comunidad grande:** Hay muchos recursos y librerías disponibles

---

## 3️⃣ Tailwind CSS

### ¿Qué es Tailwind CSS?

**Tailwind CSS** es un framework de CSS que proporciona **clases predefinidas** para crear estilos. En lugar de escribir CSS personalizado, usas clases como `bg-blue-500` o `text-white`.

**Analogía:** Tailwind es como tener un kit de herramientas listo. En lugar de crear cada herramienta desde cero, usas las que ya existen.

### ¿Para qué sirve?

- Crear diseños bonitos rápidamente
- Mantener consistencia en los estilos
- No escribir CSS personalizado
- Hacer diseños responsivos fácilmente

### Funciones Más Importantes

#### 1. **Colores**
```html
<!-- Fondo azul -->
<div class="bg-blue-500">Contenido</div>

<!-- Texto blanco -->
<div class="text-white">Texto blanco</div>

<!-- Combinación -->
<div class="bg-blue-500 text-white p-4">Botón</div>
```

#### 2. **Espaciado (Padding y Margin)**
```html
<!-- Padding (espacio interno) -->
<div class="p-4">Espacio interno de 4 unidades</div>
<div class="px-8">Espacio interno horizontal de 8</div>
<div class="py-2">Espacio interno vertical de 2</div>

<!-- Margin (espacio externo) -->
<div class="m-4">Espacio externo de 4 unidades</div>
<div class="mt-8">Espacio externo superior de 8</div>
```

#### 3. **Flexbox (Alineación)**
```html
<!-- Contenedor flexible -->
<div class="flex gap-4">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</div>

<!-- Centrado -->
<div class="flex items-center justify-center">
  Contenido centrado
</div>

<!-- Columnas -->
<div class="flex flex-col gap-2">
  <div>Fila 1</div>
  <div>Fila 2</div>
</div>
```

#### 4. **Responsividad**
```html
<!-- En pantallas pequeñas: 1 columna. En medianas: 2. En grandes: 3 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Tarjeta 1</div>
  <div>Tarjeta 2</div>
  <div>Tarjeta 3</div>
</div>
```

#### 5. **Efectos y Transiciones**
```html
<!-- Hover (cuando pasas el mouse) -->
<button class="bg-blue-500 hover:bg-blue-700 transition">
  Botón
</button>

<!-- Sombra -->
<div class="shadow-lg">Contenido con sombra</div>

<!-- Bordes redondeados -->
<div class="rounded-lg">Esquinas redondeadas</div>
```

### Ventajas en Este Proyecto

- **Tema oscuro consistente:** Todos los colores están definidos
- **Diseño responsivo:** Funciona en móvil, tablet y desktop
- **Desarrollo rápido:** No necesitas escribir CSS personalizado
- **Mantenimiento fácil:** Los estilos están en el HTML

---

## 4️⃣ Express.js

### ¿Qué es Express?

**Express** es un framework de **Node.js** para crear servidores web. Es como el "chef" que recibe peticiones (órdenes) del navegador y devuelve respuestas.

**Analogía:** Express es como un restaurante. El navegador es el cliente que pide comida, y Express es el chef que prepara la comida y la sirve.

### ¿Para qué sirve?

- Crear un servidor web
- Recibir peticiones del navegador
- Procesar datos
- Devolver respuestas

### Funciones Más Importantes

#### 1. **Crear un Servidor Básico**
```javascript
import express from 'express';

const app = express();

// Ruta GET (obtener datos)
app.get('/', (req, res) => {
  res.send('Hola, mundo');
});

// Escuchar en puerto 3000
app.listen(3000, () => {
  console.log('Servidor ejecutándose en puerto 3000');
});
```

#### 2. **Rutas**
```javascript
// GET - Obtener datos
app.get('/usuarios', (req, res) => {
  res.json({ usuarios: [] });
});

// POST - Crear datos
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  res.json({ id: 1, ...nuevoUsuario });
});

// PUT - Actualizar datos
app.put('/usuarios/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

// DELETE - Eliminar datos
app.delete('/usuarios/:id', (req, res) => {
  res.json({ mensaje: 'Usuario eliminado' });
});
```

#### 3. **Middleware**
```javascript
// Middleware para parsear JSON
app.use(express.json());

// Middleware personalizado
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Continuar con la siguiente función
});
```

#### 4. **Manejo de Errores**
```javascript
app.get('/usuarios/:id', (req, res, next) => {
  try {
    const usuario = buscarUsuario(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    next(error); // Pasar al manejador de errores
  }
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno' });
});
```

### Ventajas en Este Proyecto

- **Ligero y rápido:** Express es minimalista
- **Flexible:** Puedes hacer lo que quieras
- **Comunidad grande:** Hay muchas librerías disponibles
- **Fácil de aprender:** La sintaxis es simple

---

## 5️⃣ tRPC

### ¿Qué es tRPC?

**tRPC** es una librería que permite llamar funciones del servidor desde el navegador **con seguridad de tipos**. Es como si el navegador pudiera llamar directamente a funciones del servidor.

**Analogía:** tRPC es como un teléfono que verifica que estés llamando al número correcto antes de conectar.

### ¿Para qué sirve?

- Llamar funciones del servidor desde el navegador
- Verificar tipos de datos automáticamente
- Evitar errores de comunicación
- Generar documentación automáticamente

### Funciones Más Importantes

#### 1. **Definir Procedimientos en el Servidor**
```typescript
// server/routers.ts
import { publicProcedure, router } from './_core/trpc';
import { z } from 'zod';

export const appRouter = router({
  // Procedimiento público (sin autenticación)
  saludar: publicProcedure
    .input(z.object({ nombre: z.string() }))
    .query(({ input }) => {
      return `Hola, ${input.nombre}`;
    }),

  // Procedimiento que modifica datos
  crearUsuario: publicProcedure
    .input(z.object({ nombre: z.string(), email: z.string() }))
    .mutation(({ input }) => {
      return { id: 1, ...input };
    }),
});
```

#### 2. **Llamar Procedimientos desde el Navegador**
```typescript
// client/src/pages/Home.tsx
import { trpc } from '@/lib/trpc';

function MiComponente() {
  // Llamar a un query (obtener datos)
  const { data, isLoading } = trpc.saludar.useQuery({ nombre: 'David' });

  // Llamar a una mutation (modificar datos)
  const crearMutation = trpc.crearUsuario.useMutation();

  return (
    <div>
      <p>{data}</p>
      <button onClick={() => crearMutation.mutate({ nombre: 'Juan', email: 'juan@example.com' })}>
        Crear Usuario
      </button>
    </div>
  );
}
```

#### 3. **Validación con Zod**
```typescript
// Zod valida que los datos sean correctos
const usuarioSchema = z.object({
  nombre: z.string().min(3), // Mínimo 3 caracteres
  email: z.string().email(), // Debe ser un email válido
  edad: z.number().min(18), // Mínimo 18 años
});

// Si los datos no son válidos, tRPC devuelve un error
crearUsuario: publicProcedure
  .input(usuarioSchema)
  .mutation(({ input }) => {
    // input está garantizado que sea válido
    return { id: 1, ...input };
  }),
```

### Ventajas en Este Proyecto

- **Seguridad de tipos:** El navegador y servidor comparten tipos
- **Autocompletado:** El editor sugiere qué procedimientos existen
- **Validación automática:** Zod valida los datos
- **Menos código:** No necesitas escribir rutas REST

---

## 6️⃣ Node.js

### ¿Qué es Node.js?

**Node.js** es un entorno que permite ejecutar **JavaScript en el servidor** (no solo en el navegador). Es como tener JavaScript en todas partes.

**Analogía:** Node.js es como tener el mismo idioma (JavaScript) en el cliente y el servidor.

### ¿Para qué sirve?

- Ejecutar JavaScript en el servidor
- Crear servidores web
- Procesar archivos
- Acceder a bases de datos

### Funciones Más Importantes

#### 1. **Módulos (import/export)**
```javascript
// archivo1.js - Exportar
export function sumar(a, b) {
  return a + b;
}

// archivo2.js - Importar
import { sumar } from './archivo1.js';
console.log(sumar(2, 3)); // 5
```

#### 2. **Sistema de Archivos**
```javascript
import fs from 'fs';

// Leer archivo
const contenido = fs.readFileSync('archivo.txt', 'utf-8');

// Escribir archivo
fs.writeFileSync('archivo.txt', 'Nuevo contenido');

// Eliminar archivo
fs.unlinkSync('archivo.txt');
```

#### 3. **Promesas y async/await**
```javascript
// Promesa
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ datos: 'algo' });
    }, 1000);
  });
}

// Usar promesa
obtenerDatos().then(datos => {
  console.log(datos);
});

// async/await (forma más moderna)
async function main() {
  const datos = await obtenerDatos();
  console.log(datos);
}
```

#### 4. **Variables de Entorno**
```javascript
// Acceder a variables de entorno
const puerto = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

console.log(`Servidor en puerto ${puerto}`);
```

### Ventajas en Este Proyecto

- **Un solo lenguaje:** JavaScript en cliente y servidor
- **Rápido:** Node.js es muy eficiente
- **Librerías abundantes:** npm tiene millones de paquetes
- **Comunidad grande:** Hay recursos y ayuda disponibles

---

## 7️⃣ Drizzle ORM

### ¿Qué es Drizzle ORM?

**Drizzle** es una librería que permite trabajar con **bases de datos** usando TypeScript. En lugar de escribir SQL directamente, usas código TypeScript.

**Analogía:** Drizzle es como un traductor que convierte TypeScript a SQL.

### ¿Para qué sirve?

- Definir tablas de base de datos
- Hacer consultas a la base de datos
- Mantener la seguridad de tipos
- Migrar cambios de esquema

### Funciones Más Importantes

#### 1. **Definir Tablas**
```typescript
// drizzle/schema.ts
import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const usuarios = mysqlTable('usuarios', {
  id: int('id').autoincrement().primaryKey(),
  nombre: varchar('nombre', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  createdAt: timestamp('createdAt').defaultNow(),
});
```

#### 2. **Hacer Consultas**
```typescript
// server/db.ts
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle(process.env.DATABASE_URL);

// SELECT
const usuarios = await db.select().from(usuarios);

// WHERE
const usuario = await db
  .select()
  .from(usuarios)
  .where(eq(usuarios.id, 1));

// INSERT
await db.insert(usuarios).values({
  nombre: 'David',
  email: 'david@example.com',
});

// UPDATE
await db
  .update(usuarios)
  .set({ nombre: 'David Actualizado' })
  .where(eq(usuarios.id, 1));

// DELETE
await db.delete(usuarios).where(eq(usuarios.id, 1));
```

#### 3. **Relaciones**
```typescript
export const posts = mysqlTable('posts', {
  id: int('id').autoincrement().primaryKey(),
  titulo: varchar('titulo', { length: 255 }),
  usuarioId: int('usuarioId').references(() => usuarios.id),
});

// Consulta con relación
const postsConAutor = await db
  .select()
  .from(posts)
  .leftJoin(usuarios, eq(posts.usuarioId, usuarios.id));
```

### Ventajas en Este Proyecto

- **Seguridad de tipos:** TypeScript verifica los tipos
- **Migraciones automáticas:** `pnpm db:push` actualiza la base de datos
- **Menos SQL:** Escribes menos SQL directo
- **Refactorización segura:** Cambiar nombres es más seguro

---

## 📊 Comparativa de Tecnologías

| Tecnología | Tipo | Propósito | Lenguaje |
|-----------|------|---------|----------|
| TypeScript | Lenguaje | Seguridad de tipos | Extensión de JavaScript |
| React | Framework | Interfaz de usuario | JavaScript/TypeScript |
| Tailwind CSS | Framework CSS | Estilos | CSS |
| Express | Framework | Servidor web | JavaScript/Node.js |
| tRPC | Librería | Llamadas al servidor | TypeScript |
| Node.js | Runtime | Ejecutar JavaScript | JavaScript |
| Drizzle | ORM | Base de datos | TypeScript |

---

## 🔄 Flujo de Datos en el Proyecto

```
Usuario interactúa con React (navegador)
    ↓
React llama a tRPC
    ↓
tRPC envía datos al servidor Express
    ↓
Express valida con Zod
    ↓
Express usa Drizzle para acceder a la base de datos
    ↓
Base de datos devuelve datos
    ↓
Express devuelve respuesta a tRPC
    ↓
tRPC actualiza React
    ↓
React actualiza la interfaz
    ↓
Usuario ve los cambios
```

---

## 💡 Consejos para Aprender

1. **Empieza por lo básico:** Aprende JavaScript antes de TypeScript
2. **Practica mucho:** Escribe código todos los días
3. **Lee documentación:** Cada tecnología tiene documentación oficial
4. **Mira ejemplos:** Busca proyectos en GitHub
5. **Haz proyectos pequeños:** Practica con proyectos simples primero
6. **Únete a comunidades:** Stack Overflow, Reddit, Discord

---

## 📚 Recursos Útiles

- **TypeScript:** https://www.typescriptlang.org/
- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Express:** https://expressjs.com/
- **tRPC:** https://trpc.io/
- **Node.js:** https://nodejs.org/
- **Drizzle:** https://orm.drizzle.team/

---

**Última actualización:** 28 de Enero de 2026
