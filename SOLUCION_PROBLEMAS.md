# 🔧 Guía de Solución de Problemas - Portfolio David Arenas

Esta guía te ayudará a resolver los problemas más comunes que pueden surgir al ejecutar el proyecto.

---

## ❌ Error: "pnpm: comando no encontrado"

### Síntoma
Cuando ejecutas `pnpm install` o `pnpm dev`, ves:
```
'pnpm' no se reconoce como un comando interno o externo
```

### Causa
**Node.js no está instalado** o no está en el PATH del sistema.

### Solución

#### Paso 1: Descargar Node.js
1. Ve a https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador y sigue los pasos

#### Paso 2: Verificar la instalación
Abre una terminal nueva y ejecuta:
```bash
node --version
npm --version
```

Deberías ver números de versión (ej: v20.10.0)

#### Paso 3: Instalar pnpm
```bash
npm install -g pnpm
```

#### Paso 4: Verificar que pnpm funciona
```bash
pnpm --version
```

### Si aún no funciona
- **Windows:** Reinicia el ordenador después de instalar Node.js
- **Mac/Linux:** Abre una terminal nueva

---

## ❌ Error: "Puerto 3000 ya está en uso"

### Síntoma
Cuando ejecutas `pnpm dev`, ves:
```
Error: listen EADDRINUSE: address already in use :::3000
```

### Causa
Otra aplicación está usando el puerto 3000 (puede ser otro servidor, o una instancia anterior que no se cerró bien).

### Solución - Opción 1: Cerrar la otra aplicación

#### En Windows
1. Abre el Administrador de tareas (Ctrl + Shift + Esc)
2. Busca "node" en la lista de procesos
3. Haz clic derecho y selecciona "Finalizar tarea"
4. Intenta ejecutar `pnpm dev` de nuevo

#### En Mac/Linux
```bash
# Buscar qué proceso está usando el puerto 3000
lsof -i :3000

# Matar el proceso (reemplaza PID con el número que ves)
kill -9 PID
```

### Solución - Opción 2: Usar un puerto diferente

Si no puedes cerrar la otra aplicación, usa un puerto diferente.

#### Paso 1: Abre `vite.config.ts`
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Cambiar 3000 a 3001
  },
});
```

#### Paso 2: Ejecuta `pnpm dev` de nuevo
```bash
pnpm dev
```

Ahora el servidor estará en `http://localhost:3001`

---

## ❌ Error: "Error: EACCES: permission denied"

### Síntoma
Cuando ejecutas `pnpm install`, ves:
```
Error: EACCES: permission denied, open '/usr/local/lib/node_modules'
```

### Causa
No tienes permisos para instalar paquetes globales (común en Mac/Linux).

### Solución

#### Opción 1: Usar sudo (más rápido)
```bash
sudo pnpm install
sudo pnpm dev
```

#### Opción 2: Cambiar permisos (más seguro)
```bash
# Crear directorio para npm
mkdir ~/.npm-global

# Configurar npm para usar ese directorio
npm config set prefix '~/.npm-global'

# Agregar a PATH
export PATH=~/.npm-global/bin:$PATH

# Ahora instala sin sudo
pnpm install
pnpm dev
```

---

## ❌ Error: "node_modules no existe"

### Síntoma
Ves una carpeta `node_modules` vacía o no existe, y el proyecto no funciona.

### Causa
Las dependencias no se instalaron correctamente.

### Solución

#### Paso 1: Elimina las carpetas de caché
```bash
# En Windows
rmdir /s /q node_modules
del pnpm-lock.yaml

# En Mac/Linux
rm -rf node_modules
rm pnpm-lock.yaml
```

#### Paso 2: Instala de nuevo
```bash
pnpm install
```

#### Paso 3: Ejecuta el servidor
```bash
pnpm dev
```

---

## ❌ Error CORS: "Solicitud desde otro origen bloqueada"

### Síntoma
Ves este error en la consola del navegador:
```
Solicitud desde otro origen bloqueada: la política de mismo origen impide leer 
el recurso remoto en file:///src/main.tsx
```

### Causa
**Estás abriendo el archivo HTML directamente en el navegador** en lugar de usar el servidor.

### Solución - ¡IMPORTANTE!

**NO hagas esto:**
- No hagas doble clic en `index.html`
- No abras `file:///C:/ruta/a/index.html` en el navegador

**Haz esto:**
1. Abre una terminal
2. Navega a la carpeta del proyecto
3. Ejecuta `pnpm dev`
4. Abre `http://localhost:3000` en el navegador

**¿Por qué?**
- Los navegadores modernos tienen restricciones de seguridad
- No permiten que archivos locales (file://) accedan a APIs
- Necesitas un servidor web (que es lo que hace `pnpm dev`)

---

## ❌ Error: "Cannot find module './routers'"

### Síntoma
Cuando ejecutas `pnpm dev`, ves:
```
Error: Cannot find module './routers'
```

### Causa
Los archivos TypeScript no se compilaron correctamente.

### Solución

#### Paso 1: Limpia el caché
```bash
rm -rf dist
rm -rf .turbo
```

#### Paso 2: Reinstala dependencias
```bash
pnpm install
```

#### Paso 3: Ejecuta de nuevo
```bash
pnpm dev
```

---

## ❌ Error: "Database connection failed"

### Síntoma
Ves un error como:
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

### Causa
La base de datos no está disponible o no está configurada.

### Solución

#### Opción 1: Usar la base de datos de Manus (recomendado)
Si estás usando Manus, la base de datos ya está configurada. Asegúrate de que:
1. La variable `DATABASE_URL` esté configurada en el archivo `.env`
2. Ejecuta `pnpm db:push` para sincronizar el esquema

#### Opción 2: Configurar base de datos local
Si quieres usar MySQL localmente:

1. **Instala MySQL** desde https://dev.mysql.com/downloads/mysql/
2. **Crea una base de datos:**
   ```sql
   CREATE DATABASE portfolio;
   ```
3. **Configura la URL en `.env`:**
   ```
   DATABASE_URL="mysql://usuario:contraseña@localhost:3306/portfolio"
   ```
4. **Sincroniza el esquema:**
   ```bash
   pnpm db:push
   ```

---

## ❌ Error: "TypeScript compilation failed"

### Síntoma
Ves errores de TypeScript cuando ejecutas `pnpm dev`:
```
Type 'string' is not assignable to type 'number'
```

### Causa
Hay un error de tipos en el código.

### Solución

#### Paso 1: Identifica el error
Lee el mensaje de error. Te dirá:
- Qué archivo tiene el error
- Qué línea
- Qué es el problema

#### Paso 2: Abre el archivo
Abre el archivo mencionado en el editor.

#### Paso 3: Corrige el error
Algunos errores comunes:
- Pasaste un string cuando se esperaba un número
- Olvidaste un punto y coma
- Usaste una variable que no existe

#### Paso 4: Guarda y recarga
El servidor debería recompilarse automáticamente.

### Ejemplo de Error Común
```typescript
// ❌ Error: Type 'string' is not assignable to type 'number'
const edad: number = "25";

// ✅ Correcto
const edad: number = 25;
```

---

## ❌ Error: "Module not found: Can't resolve '@/components/ui/button'"

### Síntoma
Ves un error como:
```
Module not found: Can't resolve '@/components/ui/button'
```

### Causa
El alias `@` no está configurado correctamente.

### Solución

#### Paso 1: Verifica `tsconfig.json`
Abre `tsconfig.json` y busca:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["client/src/*"]
    }
  }
}
```

#### Paso 2: Verifica `vite.config.ts`
Abre `vite.config.ts` y busca:
```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./client/src', import.meta.url)),
  },
}
```

Si no están, agrégalos.

#### Paso 3: Reinicia el servidor
```bash
pnpm dev
```

---

## ❌ Error: "Cannot read properties of undefined (reading 'user')"

### Síntoma
Ves un error en la consola:
```
TypeError: Cannot read properties of undefined (reading 'user')
```

### Causa
Intentas acceder a una propiedad de un objeto que es `undefined`.

### Solución

#### Ejemplo del problema
```typescript
// ❌ Esto falla si usuario es undefined
const nombre = usuario.nombre;

// ✅ Esto es seguro
const nombre = usuario?.nombre;
```

#### Usa el operador `?.` (optional chaining)
```typescript
// Seguro: devuelve undefined si usuario es undefined
const nombre = usuario?.nombre;

// Seguro: devuelve null si usuario es undefined
const nombre = usuario?.nombre ?? 'Sin nombre';
```

---

## ❌ Error: "Unexpected token <"

### Síntoma
Ves un error como:
```
SyntaxError: Unexpected token '<'
```

### Causa
Probablemente estés intentando usar JSX en un archivo `.js` en lugar de `.tsx`.

### Solución

Renombra el archivo:
- De: `archivo.js`
- A: `archivo.tsx`

---

## ❌ Error: "Cannot use import statement outside a module"

### Síntoma
Ves un error como:
```
SyntaxError: Cannot use import statement outside a module
```

### Causa
Estás intentando ejecutar un archivo `.ts` directamente con Node.js.

### Solución

**NO hagas esto:**
```bash
node archivo.ts
```

**Usa tsx en su lugar:**
```bash
npx tsx archivo.ts
```

O configura el proyecto para usar módulos ES en `package.json`:
```json
{
  "type": "module"
}
```

---

## ❌ Error: "Vite failed to parse config"

### Síntoma
Ves un error como:
```
Error: Vite failed to parse config file /path/to/vite.config.ts
```

### Causa
Hay un error de sintaxis en `vite.config.ts`.

### Solución

#### Paso 1: Abre `vite.config.ts`
Busca errores de sintaxis:
- Paréntesis sin cerrar
- Llaves sin cerrar
- Comas faltantes

#### Paso 2: Verifica la sintaxis
Usa un validador JSON/TypeScript online si es necesario.

#### Paso 3: Reinicia
```bash
pnpm dev
```

---

## ❌ Error: "Unexpected token }"

### Síntoma
Ves un error de sintaxis:
```
SyntaxError: Unexpected token }
```

### Causa
Hay una llave `}` sin una llave de apertura `{` correspondiente.

### Solución

#### Paso 1: Encuentra el archivo con error
El error te dirá qué archivo y qué línea.

#### Paso 2: Verifica las llaves
Cuenta las llaves abiertas y cerradas:
- Cada `{` debe tener un `}`
- Cada `[` debe tener un `]`
- Cada `(` debe tener un `)`

#### Paso 3: Usa un editor con coloreado de sintaxis
VS Code te mostrará las llaves que no coinciden en rojo.

---

## ⚠️ Advertencia: "The data in this module is over two months old"

### Síntoma
Ves una advertencia como:
```
The data in this module is over two months old. To ensure accurate Baseline data, 
please update: `npm i baseline-browser-mapping@latest -D`
```

### Causa
Una dependencia tiene datos desactualizados.

### Solución
Ejecuta el comando sugerido:
```bash
npm i baseline-browser-mapping@latest -D
```

O actualiza todas las dependencias:
```bash
pnpm update
```

---

## 🔍 Cómo Depurar Problemas

### 1. Lee el Mensaje de Error
El mensaje de error te dice:
- Qué salió mal
- Dónde salió mal
- A veces, cómo arreglarlo

### 2. Busca en Google
Copia el mensaje de error exacto y búscalo en Google. Es probable que alguien más haya tenido el mismo problema.

### 3. Usa la Consola del Navegador
Abre F12 en el navegador y mira la pestaña "Console":
- Busca mensajes de error en rojo
- Lee el stack trace (la cadena de llamadas)

### 4. Usa console.log()
Agrega mensajes de depuración en tu código:
```typescript
console.log('Valor de x:', x);
console.log('Usuario:', usuario);
```

### 5. Reinicia Todo
A veces, simplemente reiniciar soluciona el problema:
```bash
# Detén el servidor (Ctrl + C)
# Luego:
pnpm dev
```

---

## 📞 Si Nada Funciona

1. **Lee la documentación oficial:**
   - React: https://react.dev/
   - TypeScript: https://www.typescriptlang.org/
   - tRPC: https://trpc.io/

2. **Busca en Stack Overflow:**
   - https://stackoverflow.com/

3. **Pregunta en comunidades:**
   - Reddit: r/webdev, r/typescript
   - Discord: Busca servidores de desarrollo web

4. **Revisa los archivos de documentación:**
   - `README_ES.md` - Instrucciones de instalación
   - `GUIA_LENGUAJES.md` - Explicación de tecnologías
   - `FUNCIONES_IMPORTANTES.md` - Explicación de funciones

---

## ✅ Checklist de Verificación

Si algo no funciona, verifica:

- [ ] ¿Instalaste Node.js?
- [ ] ¿Ejecutaste `pnpm install`?
- [ ] ¿Estás usando `pnpm dev` (no abriendo HTML directamente)?
- [ ] ¿El puerto 3000 está disponible?
- [ ] ¿Hay errores en la consola del navegador (F12)?
- [ ] ¿Hay errores en la terminal?
- [ ] ¿Reiniciaste el servidor?
- [ ] ¿Reiniciaste el navegador?
- [ ] ¿Borraste el caché del navegador?

---

**Última actualización:** 28 de Enero de 2026
