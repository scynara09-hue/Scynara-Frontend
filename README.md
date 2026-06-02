# REVISA LOS DEMAS PROYECTOS DE MI CLASE!!!!!!!
Repositorio: By gabrielhuav [Repositorio](https://github.com/gabrielhuav/DB-Coursework-2026-2.git)

---

# Scynara Frontend

<div align="center">

### Sistema ERP/POS moderno para gestión empresarial

Interfaz web desarrollada con React y Vite para la administración de inventarios, ventas, clientes, proveedores, empleados y reportes empresariales.

</div>

---

# 📖 Tabla de Contenidos

* Introducción
* Objetivos del Proyecto
* Características Principales
* Arquitectura General
* Módulos del Sistema
* Gestión de Estado
* Sistema de Autenticación
* Gestión de Permisos
* Estructura del Proyecto
* Tecnologías Utilizadas
* Instalación
* Variables de Entorno
* Ejecución
* Convenciones de Desarrollo
* Optimización y Rendimiento
* Compatibilidad
* Roadmap
* Licencia

---

# 📖 Introducción

Scynara es una plataforma ERP/POS diseñada para centralizar los procesos operativos de una empresa mediante una interfaz web moderna, modular y escalable.

La aplicación permite administrar:

* 📦 Inventarios
* 💰 Ventas
* 👥 Clientes
* 🏢 Proveedores
* 👨‍💼 Empleados
* 📊 Reportes empresariales
* 📝 Evaluaciones de desempeño

Todo desde una única plataforma con control de acceso basado en roles.

---

# 🎯 Objetivos del Proyecto

El frontend de Scynara fue construido con los siguientes objetivos:

## Escalabilidad

Permitir el crecimiento del sistema mediante módulos independientes sin afectar funcionalidades existentes.

## Reutilización

Implementar componentes desacoplados y reutilizables.

## Mantenibilidad

Separar responsabilidades entre:

* Vistas
* Componentes
* Contextos
* Servicios
* Utilidades

## Experiencia de Usuario

Proporcionar una interfaz intuitiva que reduzca el tiempo de aprendizaje del usuario.

---

# ✨ Características Principales

## 📊 Dashboard Empresarial

El Dashboard constituye el punto de entrada principal al sistema.

### Funcionalidades

* Indicadores clave de desempeño (KPIs)
* Resumen de ventas
* Estado general del negocio
* Accesos rápidos
* Visualización de actividad reciente
* Alertas importantes

### Beneficios

Permite conocer el estado operativo del negocio en tiempo real.

---

## 📦 Gestión de Inventario

El módulo de inventario permite administrar completamente el catálogo de productos.

### Funcionalidades

* Registro de productos
* Actualización de información
* Eliminación de registros
* Gestión de categorías
* Control de stock
* Consulta rápida
* Filtros avanzados
* Búsquedas dinámicas
* Notificaciones visuales

### Información administrada

* Nombre
* Categoría
* Precio
* Existencias
* Estado
* Información complementaria

---

## 💰 Punto de Venta (POS)

El módulo POS fue diseñado para agilizar el proceso de ventas.

### Características

* Selección rápida de productos
* Carrito dinámico
* Modificación de cantidades
* Cálculo automático de totales
* Confirmación de venta
* Historial de transacciones
* Consulta detallada de ventas

### Flujo General

```text
Producto
    ↓
Carrito
    ↓
Confirmación
    ↓
Venta Registrada
```

---

## 👥 Gestión de Clientes

Permite mantener un registro centralizado de clientes.

### Funcionalidades

* Alta de clientes
* Edición
* Consulta
* Eliminación
* Historial de compras
* Estadísticas individuales
* Visualización en tabla y cuadrícula

### Integración Geográfica

Se utiliza:

* Leaflet
* React Leaflet

para mostrar ubicaciones sobre mapas interactivos.

---

## 🏢 Gestión de Proveedores

Permite administrar proveedores relacionados con el inventario.

### Funciones

* Registro
* Actualización
* Consulta
* Historial comercial
* Información de contacto

### Objetivo

Mantener trazabilidad sobre el origen de los productos.

---

## 👨‍💼 Gestión de Empleados

Módulo orientado a recursos humanos.

### Características

* Administración de empleados
* Seguimiento de personal
* Gestión de roles
* Control de acceso
* Visualización de información laboral

---

## 📝 Evaluaciones

Sistema para registrar evaluaciones internas del personal.

### Funciones

* Creación de evaluaciones
* Seguimiento
* Historial
* Consulta de resultados

---

## 📈 Reportes Inteligentes

El sistema incluye herramientas de análisis visual.

### Reportes disponibles

* Ventas
* Inventario
* Clientes
* Proveedores

### Tecnologías

* Recharts

### Características

* Gráficos dinámicos
* Filtros por fecha
* KPIs
* Comparativas
* Métricas empresariales

---

# 🏗️ Arquitectura General

Scynara sigue una arquitectura basada en capas para garantizar escalabilidad y mantenibilidad.

```text
┌──────────────────────┐
│        Pages         │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│     Components       │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│      Context API     │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│      Services        │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│      REST API        │
└──────────────────────┘
```

Esta arquitectura facilita:

* Escalabilidad
* Reutilización de componentes
* Mantenimiento sencillo
* Separación de responsabilidades

---

# 🔐 Sistema de Autenticación

La autenticación se encuentra desacoplada del resto de módulos mediante Context API.

## Capacidades

* Inicio de sesión
* Registro de usuarios
* Persistencia de sesión
* Protección de rutas
* Gestión de permisos
* Manejo de tokens

---

# 👮 Gestión de Roles

Scynara implementa RBAC (Role-Based Access Control).

## Roles soportados

### Administrador

Acceso completo al sistema y a todos los módulos disponibles.

### Empleado

Acceso limitado según los permisos asignados.

---

# 🌐 Gestión Global de Estado

El estado de la aplicación se distribuye mediante Context API.

## Contextos Principales

### AuthContext

Gestiona:

* Usuario actual
* Sesión
* Login
* Logout
* Persistencia de autenticación

### ThemeContext

Gestiona:

* Tema claro
* Tema oscuro
* Preferencias visuales

### ProductContext

Gestiona:

* Catálogo de productos
* Existencias
* Operaciones CRUD

### ClientContext

Gestiona:

* Clientes
* Historial
* Estadísticas

---

# 🧭 Sistema de Rutas

La navegación se construye utilizando React Router DOM v7.

## Características

* Rutas protegidas
* Navegación dinámica
* Página 404 personalizada
* Gestión de permisos por ruta

Ejemplo:

```text
/
├── dashboard
├── inventory
├── sales
├── clients
├── providers
├── employees
├── reports
└── settings
```

---

# 🎨 Diseño Responsivo

La interfaz fue diseñada bajo una estrategia responsive-first.

## Compatibilidad

### Escritorio

* Chrome
* Edge
* Firefox
* Safari

### Dispositivos móviles

* Android
* iOS

### Tablets

* iPad
* Android Tablets

---

# 🌙 Temas

El sistema incorpora soporte completo para múltiples temas.

## Disponibles

* ☀️ Light Mode
* 🌙 Dark Mode

La configuración es persistente entre sesiones.

---

# 🔔 Sistema de Notificaciones

Scynara implementa mecanismos de retroalimentación visual para informar al usuario sobre eventos importantes.

### Casos de uso

* Operación exitosa
* Error
* Advertencia
* Información general

---

# 🛠️ Tecnologías Utilizadas

## Núcleo

| Tecnología        | Uso                  |
| ----------------- | -------------------- |
| React 19          | Biblioteca principal |
| Vite              | Build Tool           |
| JavaScript ES2024 | Desarrollo           |

---

## Navegación

| Tecnología          |
| ------------------- |
| React Router DOM v7 |

---

## Estado Global

| Tecnología  |
| ----------- |
| Context API |

---

## Comunicación

| Tecnología |
| ---------- |
| Axios      |

---

## Visualización

| Tecnología   |
| ------------ |
| Recharts     |
| Lucide React |

---

## Geolocalización

| Tecnología    |
| ------------- |
| Leaflet       |
| React Leaflet |

---

## Escaneo QR

| Tecnología   |
| ------------ |
| HTML5 QRCode |

---

# 📂 Estructura del Proyecto

```bash
src
│
├── assets
│
├── components
│   ├── auth
│   ├── dashboard
│   ├── inventory
│   ├── sales
│   ├── clients
│   ├── providers
│   ├── employees
│   ├── reports
│   └── shared
│
├── context
│
├── hooks
│
├── pages
│
├── routes
│
├── services
│
├── utils
│
└── styles
```

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone <repository-url>
```

## Entrar al proyecto

```bash
cd Scynara
```

## Instalar dependencias

```bash
pnpm install
```

---

# 🔧 Variables de Entorno

Crear un archivo `.env`.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

---

# ▶️ Ejecución

## Modo Desarrollo

```bash
pnpm dev
```

## Compilación para Producción

```bash
pnpm build
```

## Vista Previa

```bash
pnpm preview
```

---

# 📏 Convenciones de Desarrollo

## Componentes

```text
PascalCase
```

Ejemplo:

```text
ProductCard.jsx
```

---

## Hooks

```text
useNombreHook
```

Ejemplo:

```text
useAuth.js
```

---

## Contextos

```text
NombreContext.jsx
```

Ejemplo:

```text
AuthContext.jsx
```

---

# ⚡ Optimización

La aplicación implementa:

* Componentización modular
* Reutilización de lógica
* Separación de responsabilidades
* Renderizado optimizado
* Organización por dominios
* Código mantenible y escalable

---

# 📱 Compatibilidad

* ✅ Chrome
* ✅ Edge
* ✅ Firefox
* ✅ Safari
* ✅ Android
* ✅ iOS
* ✅ Tablets
* ✅ Pantallas de escritorio

---

# 🚧 Roadmap

Próximas funcionalidades planeadas:

* Exportación PDF
* Exportación Excel
* Dashboard configurable
* Notificaciones en tiempo real
* Multi sucursal
* Aplicación PWA
* Estadísticas avanzadas
* Integración con IA

---

# 🤝 Contribución

1. Crear una rama:

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Realizar cambios.

3. Confirmar cambios:

```bash
git commit -m "feat: nueva funcionalidad"
```

4. Subir cambios:

```bash
git push origin feature/nueva-funcionalidad
```

5. Crear Pull Request.

---

# 📄 Licencia

Proyecto desarrollado con fines académicos y de aprendizaje, orientado a la construcción de una solución ERP/POS moderna utilizando React y Vite.

---

<div align="center">

### Scynara Frontend

Sistema ERP/POS moderno desarrollado con React + Vite

</div>