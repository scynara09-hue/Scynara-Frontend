# 📋 Instrucciones para desplegar el Frontend en Vercel

## ✅ Cambios realizados

Se han preparado los siguientes archivos para el deployment:

1. **`.env.local`** - Variables de entorno para desarrollo (localhost)
2. **`.env.production`** - Variables de entorno para producción (a configurar)
3. **`.env.example`** - Plantilla para referencia
4. **`vercel.json`** - Configuración específica de Vercel
5. **`src/services/api.js`** - Actualizado para usar variables de entorno

## 🚀 Pasos para desplegar

### 1. Preparar el repositorio
```bash
# Asegúrate de que la carpeta client esté en Git
cd client
git init  # (si no está ya inicializado)
```

### 2. Configurar variables de entorno en Vercel
- Ve a tu dashboard de Vercel
- Ve a Settings → Environment Variables
- Agrega la variable:
  ```
  VITE_API_URL = https://tu-api-backend.vercel.app
  ```
  (O la URL de tu backend)

### 3. Conectar y deployar
```bash
# Instala Vercel CLI (si no la tienes)
npm i -g vercel

# Desde la carpeta client, ejecuta:
vercel
```

### 4. Configurar durante el deploy
Cuando Vercel te pregunte:
- **Framework Preset**: Vite
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Development Command**: `pnpm run dev`

## ⚙️ Configuración de la API

### Para desarrollo (`.env.local`):
```
VITE_API_URL=http://localhost:3000
```

### Para producción (Vercel):
Configura en Vercel Dashboard la variable:
```
VITE_API_URL=https://tu-backend-url.com
```

> **Importante**: Reemplaza `https://tu-backend-url.com` con la URL real de tu backend

## 🔍 Archivos ignorados en Git
Se han actualizado para que **no se suban** archivos sensibles:
- `.env` (desarrollo)
- `.env.local` (desarrollo local)
- `.env.production` (producción)

Solo se sube `.env.example` como referencia.

## ✨ Próximos pasos

1. Sube solo la carpeta `client` a un nuevo repositorio en GitHub
2. Conecta ese repositorio con Vercel
3. Vercel automáticamente deployará cuando hagas push a main/master

## 📝 Notas importantes

- El archivo `vercel.json` contiene rutas reescrites para SPA (React Router)
- Las variables de entorno se pueden cambiar en cualquier momento en Vercel
- Cada push a tu rama principal triggerea un nuevo deploy automático
