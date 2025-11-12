
# Vivero Quilino Backend

API RESTful para la gestión de productos, imágenes, categorías, temporadas, servicios y contenido institucional del Vivero Quilino.

## Tecnologías

- Node.js + TypeScript
- Express
- TypeORM
- PostgreSQL
- Zod (validación)
- Docker & Docker Compose
- Multer (subida de imágenes)
- Cloudinary (almacenamiento de imágenes)
- JWT (autenticación)
- Jest & Supertest (testing)

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

3. Configura las variables de entorno en un archivo `.env` (ver ejemplo en `.env.example`). Incluye credenciales de base de datos, Cloudinary y JWT.

4. Levanta la base de datos y el backend con Docker:
		```bash
		docker-compose up --build -d
		```

5. Corre los seeders para datos de ejemplo:
		```bash
		npm run seed
		```

6. Corre los tests:
		```bash
		npm test
		```

### Servicios Docker

- **db:** Base de datos PostgreSQL
- **backend-dev:** Backend en modo desarrollo (hot reload)
- **backend-prod:** Backend en modo producción
- **seed:** Inicialización de datos

## Autenticación

El backend implementa autenticación con JWT y refresh tokens. Los refresh tokens se almacenan en cookies HttpOnly para mayor seguridad.

- **Login:** `POST /auth/login` (devuelve access y refresh token)
- **Refresh:** `POST /auth/refresh` (renueva access token usando cookie)
- **Logout:** `POST /auth/logout` (elimina refresh token)

## Endpoints principales

- Productos: CRUD, consulta por categoría, detalles, completos, imágenes individuales y múltiples
- Categorías: CRUD, consulta por nombre, tipo, subcategorías y productos
- Temporadas: CRUD
- Servicios: CRUD, detalles y completos
- Imágenes de producto y servicio: subida y eliminación
- Contenido institucional:
	- Sobre Nosotros: GET/PUT
	- Contacto: GET/PUT
	- Encargado: GET/PUT
- Categoría de Servicios: CRUD y consulta con servicios

### Subida de imágenes

- Las imágenes se almacenan en Cloudinary. El campo `public_id` permite gestionar la eliminación remota.
- Para subir una imagen de producto:
	`POST /productos/:productoId/imagenes` (campo: `file`)
- Para subir varias imágenes de producto:
	`POST /productos/:productoId/imagenes/multiples` (campo: `files[]`)
- Para subir varias imágenes de servicio:
	`POST /servicios/:servicioId/imagenes/multiples` (campo: `files[]`)
- Eliminar imagen de servicio:
	`DELETE /imagenes-servicio/:id`

### Ejemplo de request para crear producto

```json
{
	"nombre": "Naranja",
	"descripcion": "Fruta fresca y jugosa",
	"informacion_extra": "Esta fruta es rica en vitamina C.",
	"categoria_id": 1,
	"temporada_id": 3
}
```

## Estructura del proyecto

- `src/app/` - DTOs, mapeos, schemas y seeders
- `src/domain/` - Entidades, repositorios y servicios
- `src/infrastructure/` - Controladores, rutas, middlewares y autenticación
- `src/utils/` - Utilidades (Cloudinary, helpers)
- `src/config/` - Configuración de entorno y base de datos
- `tests/` - Pruebas unitarias e integración
- `docs/` - Documentación y colección Postman

## Notas

- El backend expone la API en `http://localhost:4000/`
- Las imágenes se guardan en Cloudinary (no en `uploads/` local)
- La autenticación es obligatoria para endpoints protegidos
- Puedes probar la API con la colección Postman en `docs/`

## Endpoints destacados (resumen)

- Servicios completos:
	- `GET /servicios/completos`
	- `GET /servicios/completos/:id`
- Sobre Nosotros:
	- `GET /sobre-nosotros/:id`
	- `PUT /sobre-nosotros/:id`
- Contacto:
	- `GET /contacto/:id`
	- `PUT /contacto/:id`
- Encargado:
	- `GET /encargado/:id`
	- `PUT /encargado/:id`

## Seeders

Incluidos y ejecutados con `npm run seed`:

- Admin (usuario inicial)
- Categorías
- Temporadas
- Productos
- Categorías de Servicio
- Servicios (con imágenes de ejemplo)
- Sobre Nosotros (registro base id=1)
- Contacto (registro base id=1)
- Encargados (2 registros de ejemplo)

También puedes ejecutar los seeders en Docker con:

```
npm run seed:docker
```
