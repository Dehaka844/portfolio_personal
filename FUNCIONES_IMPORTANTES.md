# 🔧 Funciones Importantes en Cada Fichero - Portfolio David Arenas

Esta guía explica **qué hace cada función importante** en el código del proyecto, en español.

---

## 📁 FRONTEND - Cliente (Navegador)

### 📄 `client/src/pages/Home.tsx` - Página de Inicio

**Propósito:** Mostrar la página principal con animación de telón y botones de navegación.

#### Función Principal: `Home()`
```typescript
export default function Home() {
  // Esta es la función principal que devuelve el HTML de la página
  // Se ejecuta cuando el usuario accede a http://localhost:3000/
}
```

**¿Qué hace?**
- Crea la estructura HTML de la página de inicio
- Renderiza la animación del telón (cortinas que se abren)
- Muestra el texto de bienvenida
- Crea dos botones que llevan a los proyectos

**Elementos importantes:**

#### 1. **Telón Izquierdo y Derecho**
```typescript
// Estos divs crean las cortinas que se abren
<div className="curtain curtain-left">
  {/* Cortina izquierda */}
</div>
<div className="curtain curtain-right">
  {/* Cortina derecha */}
</div>
```

**¿Qué hace?**
- Crea dos elementos que se animan al cargar la página
- La animación los mueve hacia los lados (se abren)
- El efecto es como abrir cortinas de un teatro

#### 2. **Contenido Central**
```typescript
<div className="content">
  <h1>Bienvenido a mi web</h1>
  <p>Explora mis proyectos innovadores con IA</p>
</div>
```

**¿Qué hace?**
- Muestra el texto de bienvenida
- El texto está centrado en la pantalla
- Se anima para aparecer después de que se abran las cortinas

#### 3. **Botones de Navegación**
```typescript
<Link to="/proyecto-1" className="project-button">
  <h3>Proyecto 1</h3>
  <p>Generador de Esquemas SQL</p>
  <small>Genera tablas optimizadas con IA</small>
</Link>

<Link to="/proyecto-2" className="project-button">
  <h3>Proyecto 2</h3>
  <p>Buscador de Productos</p>
  <small>Encuentra y compara productos online</small>
</Link>
```

**¿Qué hace?**
- Crea dos botones clicables
- Cada botón lleva a una página diferente
- El componente `Link` es de la librería `wouter` (enrutador)
- Tienen efectos hover (cambian cuando pasas el mouse)

#### 4. **Puntos Decorativos Animados**
```typescript
<div className="dots">
  <span></span>
  <span></span>
  <span></span>
</div>
```

**¿Qué hace?**
- Crea tres puntos pequeños en la parte inferior
- Se animan continuamente (suben y bajan)
- Son solo decoración para mejorar la estética

---

### 📄 `client/src/pages/Proyecto1.tsx` - Generador de Esquemas SQL

**Propósito:** Permitir al usuario generar esquemas SQL y ver diagramas ER usando IA.

#### Función Principal: `Proyecto1()`
```typescript
export default function Proyecto1() {
  // Esta función crea la interfaz del generador de SQL
  // Se ejecuta cuando el usuario hace clic en "Proyecto 1"
}
```

**¿Qué hace?**
- Crea un chat donde el usuario puede escribir ideas de proyectos
- Envía la idea al servidor para que la IA genere SQL
- Muestra el SQL generado en el lado izquierdo
- Muestra el diagrama ER en el lado derecho

#### 1. **Estado del Componente**
```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState('');
const [showDialog, setShowDialog] = useState(true);
```

**¿Qué hace?**
- `messages` - Guarda el historial de mensajes del chat
- `input` - Guarda lo que el usuario está escribiendo
- `showDialog` - Controla si se muestra el popup explicativo

#### 2. **Mutation de tRPC**
```typescript
const generateSchemaMutation = trpc.sqlGenerator.generateSchema.useMutation();
```

**¿Qué hace?**
- Crea una conexión con el servidor para generar esquemas SQL
- `useMutation` significa que va a modificar datos (no solo obtenerlos)
- Cuando se ejecuta, envía la idea del proyecto al servidor

#### 3. **Función para Enviar Mensaje**
```typescript
const handleSendMessage = async () => {
  if (!input.trim()) return; // No enviar si está vacío

  // Agregar mensaje del usuario al chat
  const userMessage: Message = { role: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput(''); // Limpiar el input

  // Llamar al servidor para generar SQL
  const result = await generateSchemaMutation.mutateAsync({
    projectIdea: input
  });

  // Agregar respuesta del servidor al chat
  const assistantMessage: Message = {
    role: 'assistant',
    content: `SQL:\n${result.sqlSchema}\n\nDiagrama ER:\n${result.erDiagram}`
  };
  setMessages(prev => [...prev, assistantMessage]);
};
```

**¿Qué hace?**
- Valida que el usuario haya escrito algo
- Agrega el mensaje del usuario al chat
- Limpia el input para que pueda escribir de nuevo
- Envía la idea al servidor
- Agrega la respuesta del servidor al chat

#### 4. **Renderizado del Chat**
```typescript
{messages.map((msg, idx) => (
  <div key={idx} className={`message ${msg.role}`}>
    {msg.role === 'user' ? '👤' : '🤖'}
    <Streamdown>{msg.content}</Streamdown>
  </div>
))}
```

**¿Qué hace?**
- Recorre todos los mensajes del chat
- Muestra cada mensaje con un ícono (👤 para usuario, 🤖 para IA)
- Usa `Streamdown` para renderizar markdown (texto con formato)
- `key={idx}` ayuda a React a identificar cada elemento

#### 5. **Popup Explicativo**
```typescript
<Dialog open={showDialog} onOpenChange={setShowDialog}>
  <DialogContent>
    <h2>Generador de Esquemas SQL</h2>
    <p>Introduce una idea de proyecto...</p>
  </DialogContent>
</Dialog>
```

**¿Qué hace?**
- Muestra un popup cuando el usuario entra por primera vez
- Explica qué hace la página
- El usuario puede cerrarlo haciendo clic en una X

---

### 📄 `client/src/pages/Proyecto2.tsx` - Buscador de Productos

**Propósito:** Permitir al usuario buscar productos y ver resultados de diferentes tiendas.

#### Función Principal: `Proyecto2()`
```typescript
export default function Proyecto2() {
  // Esta función crea la interfaz del buscador de productos
  // Se ejecuta cuando el usuario hace clic en "Proyecto 2"
}
```

**¿Qué hace?**
- Crea una barra de búsqueda
- Permite al usuario buscar productos
- Muestra los resultados en un grid de tarjetas
- Cada tarjeta muestra imagen, precio, descripción y enlace

#### 1. **Estado del Componente**
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [products, setProducts] = useState<Product[]>([]);
const [hasSearched, setHasSearched] = useState(false);
```

**¿Qué hace?**
- `searchQuery` - Guarda lo que el usuario está buscando
- `products` - Guarda los resultados de la búsqueda
- `hasSearched` - Controla si el usuario ya ha hecho una búsqueda

#### 2. **Mutation de tRPC**
```typescript
const searchProductsMutation = trpc.productSearch.search.useMutation();
```

**¿Qué hace?**
- Crea una conexión con el servidor para buscar productos
- Cuando se ejecuta, envía el término de búsqueda al servidor

#### 3. **Función para Buscar**
```typescript
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault(); // Evitar recargar la página

  if (!searchQuery.trim()) return; // No buscar si está vacío

  setHasSearched(true);

  // Llamar al servidor para buscar productos
  const results = await searchProductsMutation.mutateAsync({
    query: searchQuery
  });

  // Guardar los resultados
  setProducts(results);
};
```

**¿Qué hace?**
- Valida que el usuario haya escrito algo
- Marca que ya se hizo una búsqueda
- Envía el término de búsqueda al servidor
- Guarda los resultados para mostrarlos

#### 4. **Renderizado de Resultados**
```typescript
<div className="products-grid">
  {products.map(product => (
    <div key={product.id} className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price}</p>
      <p className="description">{product.description}</p>
      <span className="retailer">{product.retailer}</span>
      <a href={product.url} target="_blank" rel="noopener noreferrer">
        Ver Producto
      </a>
    </div>
  ))}
</div>
```

**¿Qué hace?**
- Recorre todos los productos encontrados
- Crea una tarjeta para cada producto
- Muestra imagen, nombre, precio, descripción y tienda
- El botón "Ver Producto" abre el enlace en una pestaña nueva

#### 5. **Estado Vacío**
```typescript
{hasSearched && products.length === 0 && (
  <div className="empty-state">
    <p>No se encontraron productos para "{searchQuery}"</p>
  </div>
)}
```

**¿Qué hace?**
- Muestra un mensaje si no hay resultados
- Solo aparece si el usuario ya ha hecho una búsqueda

---

### 📄 `client/src/App.tsx` - Configuración de Rutas

**Propósito:** Configurar las rutas de la aplicación y los providers necesarios.

#### Función Principal: `App()`
```typescript
function App() {
  // Esta función configura toda la aplicación
  // Define qué página mostrar según la URL
}
```

**¿Qué hace?**
- Configura el tema oscuro
- Define las rutas (qué página mostrar según la URL)
- Proporciona servicios globales (tRPC, Toaster, etc.)

#### 1. **Router (Rutas)**
```typescript
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/proyecto-1"} component={Proyecto1} />
      <Route path={"/proyecto-2"} component={Proyecto2} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

**¿Qué hace?**
- Define qué componente mostrar para cada URL
- `/` muestra la página de inicio
- `/proyecto-1` muestra el generador de SQL
- `/proyecto-2` muestra el buscador de productos
- Las rutas no encontradas muestran la página 404

#### 2. **Providers**
```typescript
<ThemeProvider defaultTheme="dark">
  <TooltipProvider>
    <Toaster />
    <Router />
  </TooltipProvider>
</ThemeProvider>
```

**¿Qué hace?**
- `ThemeProvider` - Proporciona el tema oscuro a toda la aplicación
- `TooltipProvider` - Permite mostrar tooltips (ayudas)
- `Toaster` - Muestra notificaciones (mensajes emergentes)
- `Router` - Muestra la página según la URL

---

### 📄 `client/src/index.css` - Estilos Globales

**Propósito:** Definir los colores, fuentes y estilos globales de la aplicación.

#### 1. **Variables de Color**
```css
@layer base {
  :root {
    /* Colores principales */
    --background: oklch(0.12 0.08 250); /* Azul marino muy oscuro */
    --foreground: oklch(0.92 0.01 250); /* Blanco azulado */
    --card: oklch(0.16 0.08 250); /* Azul marino más claro */
    --accent: oklch(0.55 0.25 280); /* Morado vibrante */
  }
}
```

**¿Qué hace?**
- Define los colores principales de la aplicación
- Usa formato OKLCH (un formato moderno de colores)
- Todos los componentes usan estos colores

#### 2. **Estilos Base**
```css
@layer base {
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }

  .container {
    @apply max-w-7xl mx-auto px-4;
  }

  .flex {
    @apply flex min-w-0 min-h-0;
  }
}
```

**¿Qué hace?**
- Define el fondo y color de texto para toda la página
- `.container` crea un contenedor centrado
- `.flex` es un atajo para flexbox

#### 3. **Animaciones Personalizadas**
```css
@keyframes openCurtain {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.curtain-left {
  animation: openCurtain 1s ease-out forwards;
}

.curtain-right {
  animation: openCurtain 1s ease-out forwards;
  transform: scaleX(-1);
}
```

**¿Qué hace?**
- Define la animación del telón
- `@keyframes` define cómo se mueve
- La animación dura 1 segundo
- Las cortinas se mueven hacia los lados

---

### 📄 `client/src/lib/trpc.ts` - Cliente tRPC

**Propósito:** Configurar la conexión con el servidor tRPC.

#### Función Principal: `createTRPCReact<AppRouter>()`
```typescript
export const trpc = createTRPCReact<AppRouter>();
```

**¿Qué hace?**
- Crea un cliente tRPC tipado
- `AppRouter` es el tipo que importa del servidor
- Permite llamar funciones del servidor desde React

**¿Cómo se usa?**
```typescript
// En un componente
const { data } = trpc.sqlGenerator.generateSchema.useQuery({ projectIdea: 'mi idea' });
```

---

## 🖥️ BACKEND - Servidor

### 📄 `server/routers.ts` - Definición de Procedimientos

**Propósito:** Definir todas las funciones que el servidor puede hacer.

#### Función Principal: `appRouter`
```typescript
export const appRouter = router({
  // Todos los procedimientos están aquí
});
```

**¿Qué hace?**
- Define todos los procedimientos (funciones) que el servidor puede ejecutar
- Es como un menú de restaurante: lista todas las opciones disponibles

#### 1. **Router de Autenticación**
```typescript
auth: router({
  me: publicProcedure.query((opts) => opts.ctx.user),
  logout: publicProcedure.mutation(({ ctx }) => {
    // Limpia la cookie de sesión
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true };
  }),
}),
```

**¿Qué hace?**
- `me` - Devuelve el usuario actual
- `logout` - Cierra la sesión del usuario limpiando la cookie

#### 2. **Router de Generador SQL**
```typescript
sqlGenerator: router({
  generateSchema: publicProcedure
    .input(z.object({ projectIdea: z.string() }))
    .mutation(async ({ input }) => {
      // Llamar a la IA para generar SQL
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are an expert database architect...`
          },
          {
            role: "user",
            content: `Generate SQL tables for this project: ${input.projectIdea}`
          }
        ]
      });

      const sqlSchema = response.choices[0]?.message.content;

      // Generar diagrama ER
      const erResponse = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are an expert at creating Mermaid ER diagrams...`
          },
          {
            role: "user",
            content: `Create a Mermaid ER diagram for these tables:\n${sqlSchema}`
          }
        ]
      });

      return {
        sqlSchema,
        erDiagram: erResponse.choices[0]?.message.content
      };
    })
}),
```

**¿Qué hace?**
- Recibe una idea de proyecto del usuario
- Llama a la IA (LLM) para generar SQL
- Llama a la IA de nuevo para generar un diagrama ER
- Devuelve ambos resultados al cliente

**Pasos:**
1. El usuario escribe una idea (ej: "Blog con usuarios y comentarios")
2. El servidor recibe la idea
3. Llama a la IA con un prompt que dice "Eres un experto en bases de datos"
4. La IA genera SQL optimizado
5. El servidor llama a la IA de nuevo para generar un diagrama
6. Devuelve ambos resultados al cliente

#### 3. **Router de Búsqueda de Productos**
```typescript
productSearch: router({
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      // Llamar a la IA para generar resultados
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a product search assistant...`
          },
          {
            role: "user",
            content: `Search for: ${input.query}. Return 6 realistic products...`
          }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            // Esquema de validación
          }
        }
      });

      const content = response.choices[0]?.message.content;
      const parsed = JSON.parse(content);
      return parsed.products;
    })
}),
```

**¿Qué hace?**
- Recibe un término de búsqueda del usuario
- Llama a la IA para generar productos realistas
- La IA devuelve JSON con productos
- Devuelve los productos al cliente

**Pasos:**
1. El usuario busca "mesa de escritorio"
2. El servidor recibe la búsqueda
3. Llama a la IA con un prompt que dice "Eres un asistente de búsqueda de productos"
4. La IA genera 6 productos realistas en formato JSON
5. El servidor valida el JSON
6. Devuelve los productos al cliente

---

### 📄 `server/db.ts` - Funciones de Base de Datos

**Propósito:** Proporcionar funciones para acceder a la base de datos.

#### Función 1: `getDb()`
```typescript
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
```

**¿Qué hace?**
- Obtiene la conexión a la base de datos
- Si no existe, la crea usando la URL de conexión
- Si hay error, lo registra y devuelve null
- Usa "lazy loading" (solo se conecta cuando se necesita)

#### Función 2: `upsertUser()`
```typescript
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  // Inserta o actualiza el usuario
  await db.insert(users).values(values).onDuplicateKeyUpdate({
    set: updateSet,
  });
}
```

**¿Qué hace?**
- Crea un usuario nuevo o actualiza uno existente
- "Upsert" = "Update" + "Insert"
- Valida que el usuario tenga un openId
- Si el usuario ya existe, actualiza sus datos
- Si no existe, lo crea

#### Función 3: `getUserByOpenId()`
```typescript
export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}
```

**¿Qué hace?**
- Busca un usuario por su openId
- Devuelve el usuario si lo encuentra
- Devuelve undefined si no lo encuentra
- `limit(1)` asegura que solo devuelve un usuario

---

### 📄 `drizzle/schema.ts` - Esquema de Base de Datos

**Propósito:** Definir la estructura de las tablas de la base de datos.

#### Tabla de Usuarios
```typescript
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
```

**¿Qué hace?**
- Define una tabla llamada "users" en la base de datos
- Define las columnas y sus tipos:
  - `id` - Número que se incrementa automáticamente (clave primaria)
  - `openId` - Texto único del usuario de OAuth
  - `name` - Nombre del usuario
  - `email` - Email del usuario
  - `role` - "user" o "admin"
  - `createdAt` - Fecha de creación
  - `updatedAt` - Fecha de última actualización
  - `lastSignedIn` - Última vez que inició sesión

#### Tipos TypeScript
```typescript
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
```

**¿Qué hace?**
- `User` - Tipo para un usuario que ya existe en la base de datos
- `InsertUser` - Tipo para crear un usuario nuevo
- Estos tipos se generan automáticamente de la tabla

---

## 🧪 TESTS

### 📄 `server/routers.test.ts` - Tests de Routers

**Propósito:** Verificar que los routers estén correctamente definidos.

#### Función de Test 1: Verificar que appRouter existe
```typescript
it("should define appRouter", () => {
  expect(appRouter).toBeDefined();
});
```

**¿Qué hace?**
- Verifica que el appRouter esté definido
- Si no está definido, el test falla

#### Función de Test 2: Verificar que existen los procedimientos
```typescript
it("should have auth.logout procedure", () => {
  expect(appRouter._def.procedures).toHaveProperty("auth.logout");
});
```

**¿Qué hace?**
- Verifica que el procedimiento "auth.logout" existe
- Si no existe, el test falla

#### Cómo Ejecutar los Tests
```bash
pnpm test
```

**¿Qué sucede?**
- Se ejecutan todos los tests
- Si todos pasan, ves un mensaje de éxito
- Si alguno falla, ves un mensaje de error

---

## 📊 Resumen de Funciones Clave

| Fichero | Función | Propósito |
|---------|---------|-----------|
| `Home.tsx` | `Home()` | Mostrar página de inicio |
| `Proyecto1.tsx` | `handleSendMessage()` | Enviar idea al servidor |
| `Proyecto2.tsx` | `handleSearch()` | Buscar productos |
| `App.tsx` | `Router()` | Definir rutas |
| `routers.ts` | `generateSchema()` | Generar SQL con IA |
| `routers.ts` | `search()` | Buscar productos con IA |
| `db.ts` | `getDb()` | Obtener conexión a BD |
| `db.ts` | `upsertUser()` | Crear o actualizar usuario |
| `schema.ts` | `users` | Definir tabla de usuarios |

---

## 🔄 Flujo de Ejecución Completo

### Cuando el usuario busca un producto:

```
1. Usuario escribe "mesa de escritorio" en Proyecto2.tsx
   ↓
2. Usuario presiona Enter o click en botón
   ↓
3. handleSearch() se ejecuta en Proyecto2.tsx
   ↓
4. Llama a trpc.productSearch.search.useMutation()
   ↓
5. tRPC envía la búsqueda al servidor
   ↓
6. En routers.ts, se ejecuta productSearch.search()
   ↓
7. invokeLLM() es llamado con el prompt
   ↓
8. La IA (LLM) genera 6 productos realistas en JSON
   ↓
9. El servidor valida el JSON
   ↓
10. Devuelve los productos al cliente
   ↓
11. React actualiza el estado (setProducts)
   ↓
12. El componente se re-renderiza
   ↓
13. El usuario ve las tarjetas de productos
```

---

## 💡 Consejos para Entender el Código

1. **Lee los comentarios** - Cada función tiene comentarios explicativos
2. **Busca el flujo** - Sigue cómo los datos van del usuario al servidor y de vuelta
3. **Prueba cambios pequeños** - Modifica un color o un texto para ver qué sucede
4. **Usa la consola** - Abre F12 en el navegador para ver mensajes de error
5. **Lee la documentación** - Cada librería tiene documentación oficial

---

**Última actualización:** 28 de Enero de 2026
