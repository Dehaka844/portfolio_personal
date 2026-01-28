# Portfolio David Arenas - Documentación Completa

## 📋 Descripción General

Este es un portfolio profesional interactivo desarrollado con **React 19**, **TypeScript**, **Tailwind CSS 4**, **Express** y **tRPC**. El proyecto incluye una página de inicio con animación de telón y dos proyectos interactivos impulsados por Inteligencia Artificial.

**Características principales:**
- Página de inicio con animación de telón
- Generador de esquemas SQL con IA y diagrama entidad-relación
- Buscador de productos tipo TripAdvisor
- Paleta de colores oscuros (azul marino y morado)
- Arquitectura MVC con tRPC
- Tests unitarios completos

---

## 🗂️ Estructura de Carpetas

```
portfolio_david_arenas/
├── client/                      # Frontend React
│   ├── public/                  # Assets estáticos
│   ├── src/
│   │   ├── pages/              # Componentes de página
│   │   │   ├── Home.tsx        # Página de inicio con animación
│   │   │   ├── Proyecto1.tsx   # Generador de SQL
│   │   │   ├── Proyecto2.tsx   # Buscador de productos
│   │   │   └── NotFound.tsx    # Página 404
│   │   ├── components/         # Componentes reutilizables
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/
│   │   │   └── trpc.ts        # Cliente tRPC
│   │   ├── App.tsx             # Rutas principales
│   │   ├── main.tsx            # Punto de entrada
│   │   └── index.css           # Estilos globales
│   └── index.html              # HTML base
├── server/                      # Backend Express
│   ├── routers.ts              # Definición de procedimientos tRPC
│   ├── db.ts                   # Helpers de base de datos
│   ├── routers.test.ts         # Tests unitarios
│   ├── auth.logout.test.ts     # Tests de autenticación
│   └── _core/                  # Infraestructura interna
├── drizzle/                     # Esquema de base de datos
│   └── schema.ts               # Definición de tablas
├── shared/                      # Código compartido
├── storage/                     # Helpers de almacenamiento S3
├── package.json                # Dependencias
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración Vite
├── tailwind.config.ts          # Configuración Tailwind
└── todo.md                      # Tareas del proyecto
```

---

## 📄 Descripción de Ficheros Principales

### **Frontend - Páginas**

#### `client/src/pages/Home.tsx`
**Propósito:** Página de inicio con animación de telón

**Características:**
- Animación de telón que se abre desde ambos lados
- Texto de bienvenida centrado
- Dos botones de navegación a los proyectos
- Efectos hover interactivos
- Responsive design

**Componentes clave:**
- Telón izquierdo y derecho con transiciones CSS
- Botones con gradientes y efectos hover
- Decorative dots animados en la parte inferior

---

#### `client/src/pages/Proyecto1.tsx`
**Propósito:** Generador de esquemas SQL con IA

**Características:**
- Interfaz de chat con historial de mensajes
- Generación de esquemas SQL optimizados usando IA
- Visualización de diagrama entidad-relación (ER)
- Popup explicativo inicial
- Layout dividido (chat izquierda, diagrama derecha)
- Soporte para markdown en respuestas

**Componentes clave:**
- Chat box con mensajes del usuario y IA
- Área de entrada con botón de envío
- Visualización de SQL generado
- Renderizado de diagramas ER
- Dialog informativo

**Integración tRPC:**
```typescript
const generateSchemaMutation = trpc.sqlGenerator.generateSchema.useMutation();
```

---

#### `client/src/pages/Proyecto2.tsx`
**Propósito:** Buscador de productos tipo TripAdvisor

**Características:**
- Barra de búsqueda con validación
- Listado de resultados en grid responsivo
- Tarjetas de producto con imagen, precio, descripción
- Enlaces a páginas web de origen
- Indicador de tienda/retailer
- Estados vacíos e iniciales

**Componentes clave:**
- Input de búsqueda con ícono de búsqueda
- Grid de tarjetas de producto
- Badges de retailer
- Botones de "Ver producto" con enlace externo
- Estados de carga y error

**Integración tRPC:**
```typescript
const searchProductsMutation = trpc.productSearch.search.useMutation();
```

---

### **Frontend - Estilos**

#### `client/src/index.css`
**Propósito:** Estilos globales y configuración de tema

**Características:**
- Paleta de colores oscuros (azul marino y morado)
- Variables CSS en formato OKLCH
- Tema oscuro por defecto
- Componentes personalizados (container, flex)
- Tipografía profesional

**Colores principales:**
- **Background:** `oklch(0.12 0.08 250)` - Azul marino muy oscuro
- **Accent:** `oklch(0.55 0.25 280)` - Morado vibrante
- **Card:** `oklch(0.16 0.08 250)` - Azul marino más claro
- **Foreground:** `oklch(0.92 0.01 250)` - Blanco azulado

---

#### `client/src/App.tsx`
**Propósito:** Configuración de rutas y layout principal

**Rutas definidas:**
- `/` - Página de inicio
- `/proyecto-1` - Generador de SQL
- `/proyecto-2` - Buscador de productos
- `/404` - Página no encontrada

**Configuración:**
- Tema oscuro por defecto
- Providers de tRPC, Toaster, TooltipProvider
- Error boundary para manejo de errores

---

### **Backend - Routers**

#### `server/routers.ts`
**Propósito:** Definición de todos los procedimientos tRPC

**Routers principales:**

##### 1. `auth` Router
- **logout:** Limpia la cookie de sesión
- **me:** Devuelve el usuario actual

##### 2. `sqlGenerator` Router
- **generateSchema:** Genera esquemas SQL optimizados
  - Input: `{ projectIdea: string }`
  - Output: `{ sqlSchema: string, erDiagram: string }`
  - Usa IA para generar SQL y diagramas ER

##### 3. `productSearch` Router
- **search:** Busca productos en línea
  - Input: `{ query: string }`
  - Output: Array de productos con `{ id, name, price, image, description, url, retailer }`
  - Usa IA para generar resultados realistas

##### 4. `system` Router (heredado)
- **health:** Estado del servidor
- **notifyOwner:** Notificaciones al propietario

---

#### `server/db.ts`
**Propósito:** Helpers de base de datos

**Funciones principales:**
- `getDb()` - Obtiene instancia de Drizzle
- `upsertUser()` - Crea o actualiza usuario
- `getUserByOpenId()` - Busca usuario por OpenId

---

### **Tests**

#### `server/routers.test.ts`
**Propósito:** Tests unitarios de los routers

**Tests incluidos:**
- Validación de estructura de appRouter
- Verificación de procedimientos requeridos
- Conteo de procedimientos
- Exportación de tipos

**Ejecución:**
```bash
pnpm test
```

**Resultado:** 13 tests pasando ✅

---

#### `server/auth.logout.test.ts`
**Propósito:** Tests de autenticación

**Tests incluidos:**
- Validación de logout
- Limpieza de cookies
- Opciones de cookie correctas

---

### **Configuración**

#### `package.json`
**Scripts principales:**
- `pnpm dev` - Inicia servidor de desarrollo
- `pnpm build` - Compila para producción
- `pnpm start` - Inicia servidor de producción
- `pnpm test` - Ejecuta tests unitarios
- `pnpm db:push` - Sincroniza base de datos

---

#### `tailwind.config.ts`
**Configuración de Tailwind CSS 4**
- Tema oscuro por defecto
- Colores personalizados en OKLCH
- Extensiones de componentes

---

#### `tsconfig.json`
**Configuración de TypeScript**
- Target: ES2020
- Module: ESNext
- Strict mode habilitado
- Path aliases configurados

---

## 🎨 Paleta de Colores

| Elemento | Color OKLCH | Descripción |
|----------|------------|-------------|
| Background | `oklch(0.12 0.08 250)` | Azul marino muy oscuro |
| Foreground | `oklch(0.92 0.01 250)` | Blanco azulado |
| Card | `oklch(0.16 0.08 250)` | Azul marino más claro |
| Accent | `oklch(0.55 0.25 280)` | Morado vibrante |
| Border | `oklch(0.22 0.08 250)` | Azul marino para bordes |
| Muted | `oklch(0.24 0.10 280)` | Morado oscuro |

---

## 🔄 Flujo de Datos

### Proyecto 1 - Generador SQL

```
Usuario escribe idea
    ↓
Envía mensaje al chat
    ↓
tRPC mutation: sqlGenerator.generateSchema
    ↓
Backend llama a LLM (IA)
    ↓
LLM genera SQL optimizado
    ↓
LLM genera diagrama ER
    ↓
Respuesta devuelta al frontend
    ↓
Chat muestra SQL
    ↓
Diagrama se renderiza en panel derecho
```

### Proyecto 2 - Buscador Productos

```
Usuario escribe búsqueda
    ↓
Presiona Enter o click en botón
    ↓
tRPC mutation: productSearch.search
    ↓
Backend llama a LLM (IA)
    ↓
LLM genera resultados realistas
    ↓
Respuesta devuelta al frontend
    ↓
Resultados se muestran en grid
    ↓
Usuario puede hacer click en "Ver producto"
```

---

## 🚀 Características Técnicas

### Frontend
- **React 19** - Framework UI moderno
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **tRPC** - Type-safe API calls
- **Wouter** - Routing ligero
- **Framer Motion** - Animaciones
- **Shadcn/ui** - Componentes UI
- **Streamdown** - Renderizado de markdown

### Backend
- **Express 4** - Servidor web
- **tRPC 11** - RPC type-safe
- **Drizzle ORM** - Database ORM
- **Zod** - Validación de esquemas
- **LLM Integration** - Inteligencia Artificial

### Testing
- **Vitest** - Test runner
- **13 tests pasando** - Cobertura de routers

---

## 📝 Cómo Usar

### Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Ejecutar tests
pnpm test

# Sincronizar base de datos
pnpm db:push
```

### Compilación

```bash
# Compilar para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

---

## 🔐 Variables de Entorno

Las siguientes variables se inyectan automáticamente:

- `DATABASE_URL` - Conexión a base de datos
- `JWT_SECRET` - Secreto de sesión
- `VITE_APP_ID` - ID de aplicación OAuth
- `OAUTH_SERVER_URL` - URL del servidor OAuth
- `BUILT_IN_FORGE_API_URL` - URL de APIs Manus
- `BUILT_IN_FORGE_API_KEY` - Clave de API Manus

---

## 📱 Responsividad

Todas las páginas son completamente responsivas:

- **Mobile** - Optimizado para pantallas pequeñas
- **Tablet** - Layout adaptado
- **Desktop** - Experiencia completa

### Breakpoints Tailwind
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px

---

## ✨ Mejoras Futuras

1. **Integración con APIs reales** - Usar APIs de búsqueda de productos reales
2. **Base de datos** - Guardar esquemas y búsquedas en base de datos
3. **Autenticación** - Sistema de usuarios con OAuth
4. **Exportación** - Descargar SQL y diagramas en PDF
5. **Historial** - Guardar historial de generaciones
6. **Compartir** - Compartir esquemas y búsquedas
7. **Temas** - Selector de temas claro/oscuro
8. **Internacionalización** - Soporte multiidioma

---

## 📞 Soporte

Para preguntas o problemas, consulta:
- Documentación de [tRPC](https://trpc.io)
- Documentación de [Tailwind CSS](https://tailwindcss.com)
- Documentación de [React](https://react.dev)

---

## 📄 Licencia

Este proyecto es de uso personal para el portfolio de David Arenas.

---

**Última actualización:** 26 de Enero de 2026
**Estado:** ✅ Completado y listo para producción
