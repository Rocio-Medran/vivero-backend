# Vivero Quilino Backend

API RESTful para la gestión de productos, imágenes, categorías, temporadas y servicios del Vivero Quilino.

## Tecnologías

- Node.js + TypeScript
- Express
- TypeORM
- PostgreSQL
- Zod (validación)
- Docker & Docker Compose
- Multer (subida de imágenes)

## Instalación y uso

### Requisitos

- Node.js 18+
- Docker y Docker Compose

### Desarrollo local

1. Clona el repositorio:
	```bash
	git clone https://github.com/Rocio-Medran/vivero-backend.git
	cd vivero-backend
	```

2. Instala dependencias:
	```bash
	npm install
	```

3. Configura las variables de entorno en un archivo `.env` (ver ejemplo en `.env.example`).

4. Levanta la base de datos y el backend con Docker:
	```bash
	docker-compose up --build -d
	```

5. Corre los seeders (opcional):
	```bash
	npm run seed
	```

### Endpoints principales

- **Productos:** CRUD, imágenes individuales y múltiples
- **Categorías:** CRUD y consulta con productos
- **Temporadas:** CRUD
- **Servicios:** CRUD
- **Imágenes:** subida y eliminación

### Subida de imágenes

- Para subir una imagen:  
  `POST /productos/:productoId/imagenes` (campo: `file`)
- Para subir varias imágenes:  
  `POST /productos/:productoId/imagenes/multiples` (campo: `files[]`)

### Ejemplo de request para crear producto

```json
{
  "nombre": "Naranja",
  "descripcion": "Fruta fresca y jugosa",
  "informacion_extra": "Esta fruta es rica en vitamina C.",
  "categoria_id": 1,
  "temporada_id": 3,
}
```

## Estructura del proyecto

- `src/app/` - DTOs, mapeos, schemas y seeders
- `src/domain/` - Entidades, repositorios y servicios
- `src/infrastructure/` - Controladores, rutas y middlewares
- `uploads/` - Carpeta de imágenes subidas

## Notas

- El backend expone la API en `http://localhost:4000/`
- Las imágenes se guardan en `uploads/productos/`
- No requiere autenticación por el momento
