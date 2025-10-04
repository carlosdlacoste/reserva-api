# API de Reservas de Espacios

Este proyecto es una API RESTful para gestionar reservas de espacios físicos (salas, oficinas, etc.), con autenticación JWT, validación de disponibilidad y lógica modular.

---

## Características

- Registro y login de usuarios con contraseña cifrada (bcrypt)
- Autenticación con JWT y rutas protegidas
- Creación de espacios con precios base
- Reservas asociadas al usuario autenticado
- Validación de solapamiento de horarios
- Modularización por controladores, rutas y modelos

---

## Instalación

```bash
npm install
```

## Endpoints principales
### Usuarios
- POST /users → Crea usuario
- GET /users → Lista usuarios
- GET /users/:id → Obtener usuario
- PUT /users/:id → Actualizar usuario
- DELETE /users/:id → Eliminar usuario
### Autenticación
- POST /auth/register → Crea usuario
- POST /auth/login → Devuelve token JWT
### Espacios
- POST /spaces → Crea espacio
- GET /spaces → Lista espacios
- GET /spaces/:id → Obtener espacio
- PUT /spaces/:id → Actualizar espacio
- DELETE /spaces/:id → Eliminar espacio
### Reservas
- POST /reservations → Crea reserva (requiere token)
- GET /reservations → Lista reservas del usuario autenticado
- GET /reservations/:id → Obtiene reserva para el usuario autenticado
- DELETE /reservations/:id → Eliminar reserva para el usuario

## Pruebas en Postman
- Registrar usuario → POST /auth/register
- Login → POST /auth/login → copiar token
- Crear espacio → POST /spaces
- Crear reserva → POST /reservations con header: Authorization: Bearer <tu_token_valido>

## Tecnologías
- Node.js
- Express
- JWT
- bcryptjs


## Autor
Carlos D'Lacoste
