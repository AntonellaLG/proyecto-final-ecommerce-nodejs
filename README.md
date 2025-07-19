# Proyecto final - API Rest en Node.js

## Descripción

Servidor funcional desarrollado con **Node.js** y **Express.js**.

## Funcionalidades
- Listado completo de productos (libros)
- Búsqueda de productos por ID y por título
- Creación, modificación y eliminación de productos
- Autenticación con JWT
- Consumo de servicio en la nube con Firebase

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
# Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo `.env` con los valores correspondientes para tu entorno.

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

## Documentación de la API

### Obtener todos los productos

- **GET** `/api/products`
- **Descripción:** Devuelve la lista de todos los productos.
- **Respuesta ejemplo:**

```json
[
  {
    "id": "35NvRMgjyLzP5eTfBsMG",
    "title": "Orgullo y prejuicio",
    "author": "Jane Austen",
    "gender": "Romance",
    "year": 1813,
    "price": 26000,
    "categories": ["Romance", "Clásico", "Feminismo", "Europa", "Siglo XIX"]
  },
  {
    "id": "ziGybHx0l81HznbPSqAJ",
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "gender": "Realismo mágico",
    "year": 1967,
    "price": 32000,
    "categories": ["Clásico", "Latinoamérica", "Realismo mágico", "Siglo XX"]
  }
]
```

### Buscar productos por título

- **GET** `/api/products/search?title=word`
- **Descripción:** Devuelve los productos cuyo título contiene la palabra indicada.
- **Parámetros:**
  - `name` (query, requerido): texto a buscar en el título del producto.
- **Ejemplo de uso:** `/api/products/search?title=soledad`
- **Respuesta ejemplo:**

```json
[  
  {
    "id": "ziGybHx0l81HznbPSqAJ",
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "gender": "Realismo mágico",
    "year": 1967,
    "price": 32000,
    "categories": ["Clásico", "Latinoamérica", "Realismo mágico", "Siglo XX"]
  }
]
```

### Obtener producto por ID

- **GET** `/api/products/:id`
- **Descripción:** Devuelve un producto específico por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `/api/products/yzsbgfpig4j5Dn1ZFzKd`
- **Respuesta ejemplo:**

```json
{
    "id": "yzsbgfpig4j5Dn1ZFzKd",
    "title": "Rayuela",
    "author": "Julio Cortázar",
    "gender": "Narrativa experimental",
    "year": 1963,
    "price": 30000,
    "categories": ["Clásico", "Latinoamérica", "Experimental", "Siglo XX"]
}
```

### Crear un producto

- **POST** `/api/products`
- **Descripción:** Crea un nuevo producto.
- **Body (JSON):**

```json
{
    "title": "Crímenes imperceptibles",
    "author": "Guillermo Martínez",
    "gender": "Policial",
    "year": 2003,
    "price": 26000,
    "categories": ["Policial", "Misterio", "Thriller"]
}
```

- **Respuesta ejemplo:**

```json
{
    "id": "vvshc2mXrsxEl7gfWJdi",
    "title": "Crímenes imperceptibles",
    "author": "Guillermo Martínez",
    "gender": "Policial",
    "year": 2003,
    "price": 26000,
    "categories": ["Policial", "Misterio", "Thriller"]
}
```

### Actualizar un producto (PUT)

- **PUT** `/api/products/:id`
- **Descripción:** Actualiza completamente un producto existente, por lo cual debemos pasar todas las propiedades del producto.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):**

```json
{
    "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "gender": "Fábula filosófica",
    "year": 1943,
    "price": 27000,
    "categories": ["Clásico", "Infantil", "Filosofía", "Aventura", "Europa", "Siglo XX"]
}
```

- **Respuesta ejemplo:**

```json
{ 
    "id": "sgg9L6OjMUVe1C8hNpsc",
    "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "gender": "Fábula filosófica",
    "year": 1943,
    "price": 27000,
    "categories": ["Clásico", "Infantil", "Filosofía", "Aventura", "Europa", "Siglo XX"]
}
```

### Eliminar un producto

- **DELETE** `/api/products/:id`
- **Descripción:** Elimina un producto por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a eliminar.
- **Respuesta:** 204 No Content

## Códigos de estado

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `204` - No Content: Recurso eliminado exitosamente
- `400` - Bad Request: Datos de entrada inválidos
- `404` - Not Found: Recurso no encontrado

## Autenticación
- **LOGIN** `/login`
- **Descripción:** 
     - Para obtener todos los productos, buscar productos por ID o por título **no es requisito estar logueado**.
    - Para crear, actualizar y borrar un producto **es requisito estar logueado**.
- **Body (JSON):**

```json
{
  "email": "user@email.com",
  "password": "*************"
}
```
- **Respuesta:** Devuelve un token JWT si las credenciales son válidas.

## Estructura del proyecto

```
src/
├── Controllers/
│   └── auth.controller.js
│   └── products.controller.js
├── Middlewares/
│   └── auth.middleware.js
├── Models/
│   └── data.js
│   └── products.model.js
└── Routes/
    └── auth.router.js
    └── products.router.js

```

## Tecnologías utilizadas

- Node.js
- Express.js
- ES6 Modules
- Firebase
- Vercel
