# 📚 Portfolio David Arenas - Guía de Instalación y Ejecución

## 🚨 Problema Común: Error CORS

Si ves el error **"Solicitud desde otro origen bloqueada: la política de mismo origen impide leer el recurso remoto en file:///src/main.tsx"**, significa que estás intentando abrir el archivo HTML directamente en el navegador. **Esto no funcionará.**

Este proyecto es una **aplicación web moderna** que requiere un servidor web para ejecutarse. No puedes simplemente hacer doble clic en un archivo HTML.

---

## ✅ Requisitos Previos

Antes de ejecutar el proyecto, necesitas tener instalado en tu ordenador:

### 1. **Node.js** (incluye npm y pnpm)
- **Descarga desde:** https://nodejs.org/ (versión LTS recomendada)
- **Verificar instalación:**
  ```bash
  node --version
  npm --version
  ```

### 2. **Git** (opcional pero recomendado)
- **Descarga desde:** https://git-scm.com/
- Útil para clonar repositorios y gestionar versiones

### 3. **Un editor de código** (recomendado)
- **Visual Studio Code:** https://code.visualstudio.com/
- **WebStorm:** https://www.jetbrains.com/webstorm/
- Cualquier editor de texto funcionará, pero estos tienen mejores características

---

## 📦 Paso 1: Instalar Dependencias

Una vez que hayas descargado la carpeta del proyecto, abre una terminal (cmd, PowerShell o bash) y navega a la carpeta del proyecto:

```bash
cd ruta/a/portfolio_david_arenas
```

Luego instala todas las dependencias necesarias:

```bash
pnpm install
```

**¿Qué hace este comando?**
- Lee el archivo `package.json` que contiene la lista de todas las librerías necesarias
- Descarga e instala cada una de esas librerías en la carpeta `node_modules`
- Crea un archivo `pnpm-lock.yaml` que asegura que todos usen las mismas versiones

**Tiempo estimado:** 2-5 minutos (depende de tu conexión a internet)

---

## 🚀 Paso 2: Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

**¿Qué sucede?**
- Se inicia un servidor web en tu ordenador
- Verás un mensaje como: `Server running on http://localhost:3000/`
- El navegador puede abrirse automáticamente, o debes ir a `http://localhost:3000`

**Ahora sí puedes ver la web funcionando correctamente.**

---

## 🌐 Acceder a la Aplicación

Una vez que el servidor esté ejecutándose, abre tu navegador favorito y ve a:

```
http://localhost:3000
```

Deberías ver la página de inicio con:
- El texto "Bienvenido a mi web"
- La animación del telón
- Dos botones: "Proyecto 1" y "Proyecto 2"

---

## 🛑 Detener el Servidor

Para detener el servidor, presiona en la terminal:

```
Ctrl + C
```

(En Mac: `Cmd + C`)

---

## 🔧 Otros Comandos Útiles

### Compilar para Producción
```bash
pnpm build
```
Crea una versión optimizada lista para publicar en internet.

### Ejecutar Tests
```bash
pnpm test
```
Ejecuta las pruebas unitarias para verificar que todo funciona correctamente.

### Verificar Tipos de TypeScript
```bash
pnpm check
```
Verifica que no haya errores de tipos en el código.

### Formatear Código
```bash
pnpm format
```
Formatea automáticamente el código para que sea más legible.

---

## 📂 Estructura del Proyecto

```
portfolio_david_arenas/
├── client/                    # Código del navegador (Frontend)
│   ├── src/
│   │   ├── pages/            # Páginas principales
│   │   │   ├── Home.tsx      # Página de inicio
│   │   │   ├── Proyecto1.tsx # Generador de SQL
│   │   │   └── Proyecto2.tsx # Buscador de productos
│   │   ├── components/       # Componentes reutilizables
│   │   ├── App.tsx           # Configuración de rutas
│   │   ├── main.tsx          # Punto de entrada
│   │   └── index.css         # Estilos globales
│   └── index.html            # Página HTML base
├── server/                    # Código del servidor (Backend)
│   ├── routers.ts            # Definición de funciones del servidor
│   ├── db.ts                 # Funciones de base de datos
│   └── _core/                # Código interno del servidor
├── drizzle/                   # Configuración de base de datos
├── package.json              # Lista de dependencias
├── tsconfig.json             # Configuración de TypeScript
├── tailwind.config.ts        # Configuración de estilos
└── vite.config.ts            # Configuración del servidor
```

---

## 🐛 Solución de Problemas Comunes

### Problema: "pnpm: comando no encontrado"
**Solución:** Instala Node.js desde https://nodejs.org/

### Problema: "Puerto 3000 ya está en uso"
**Solución:** El puerto 3000 ya está siendo usado por otra aplicación. Puedes:
1. Cerrar la otra aplicación
2. O cambiar el puerto en el archivo `vite.config.ts`

### Problema: "Error: EACCES: permission denied"
**Solución:** En Mac/Linux, intenta:
```bash
sudo pnpm install
sudo pnpm dev
```

### Problema: "node_modules no existe"
**Solución:** Ejecuta `pnpm install` nuevamente

### Problema: "Error de CORS al abrir archivo HTML"
**Solución:** **No abras el archivo HTML directamente.** Usa `pnpm dev` para ejecutar el servidor.

---

## 📖 Próximos Pasos

Una vez que el proyecto esté ejecutándose:

1. **Explora la página de inicio** - Haz clic en los botones para ir a los proyectos
2. **Prueba Proyecto 1** - Escribe una idea de proyecto para generar SQL
3. **Prueba Proyecto 2** - Busca un producto para ver los resultados
4. **Lee la documentación** - Abre `DOCUMENTACION.md` para entender el código
5. **Modifica el código** - Cambia colores, textos, o añade nuevas características

---

## 💡 Consejos para Desarrolladores

### Cambios en Tiempo Real
Mientras ejecutas `pnpm dev`, cualquier cambio que hagas en los archivos se reflejará automáticamente en el navegador. No necesitas reiniciar el servidor.

### Consola del Navegador
Abre la consola del navegador (F12 o Ctrl+Shift+I) para ver mensajes de error y depuración.

### Extensiones Útiles para VS Code
- **ES7+ React/Redux/React-Native snippets** - Autocompletado para React
- **Tailwind CSS IntelliSense** - Autocompletado para Tailwind
- **TypeScript Vue Plugin** - Soporte para TypeScript
- **Prettier - Code formatter** - Formatea el código automáticamente

---

## 🌍 Publicar en Internet

Cuando estés listo para publicar tu portfolio en internet:

1. Usa la plataforma **Manus** (donde está alojado actualmente)
2. O despliega en plataformas como:
   - **Vercel** (recomendado para Next.js/React)
   - **Netlify** (fácil de usar)
   - **Railway** (buena relación precio-rendimiento)
   - **Heroku** (popular para aplicaciones full-stack)

---

## 📞 Ayuda Adicional

Si tienes problemas:

1. **Lee el archivo `DOCUMENTACION.md`** - Tiene explicaciones detalladas del código
2. **Lee el archivo `GUIA_LENGUAJES.md`** - Explica cada tecnología usada
3. **Revisa los comentarios en el código** - Cada función tiene explicaciones
4. **Busca en Google** - La mayoría de errores ya han sido resueltos por otros

---

## ✨ ¡Felicidades!

Ahora tienes un portfolio profesional completamente funcional. ¡Úsalo para impresionar a los reclutadores y conseguir ese trabajo que mereces!

**Última actualización:** 28 de Enero de 2026
