# Scynara — Frontend

Scynara es una aplicación web creada para facilitar la administración diaria de una tienda. Desde una sola interfaz permite consultar el estado del negocio y realizar las operaciones más comunes.

Repositorio central del proyecto: [DB-Coursework-2026-2](https://github.com/gabrielhuav/DB-Coursework-2026-2.git)

## Funciones principales

- Inicio de sesión y registro de usuarios.
- Panel con un resumen del negocio.
- Control de productos e inventario.
- Registro e historial de ventas.
- Administración de clientes y proveedores.
- Control de empleados.
- Reportes y alertas de inventario.
- Tema claro y oscuro.

Las opciones disponibles dependen del rol y los permisos de cada usuario.

## Tecnologías

La aplicación está desarrollada con React y Vite. Utiliza Axios para conectarse con el backend, Recharts para las gráficas y Leaflet para los mapas.

## Instalación

Instala las dependencias:

```bash
pnpm install
```

Crea un archivo `.env` con la dirección del backend:

```env
VITE_API_URL=http://localhost:3000/
```

Inicia el proyecto:

```bash
pnpm dev
```

Para generar la versión de producción:

```bash
pnpm build
```

## Licencia

Este proyecto está publicado bajo la licencia MIT.
