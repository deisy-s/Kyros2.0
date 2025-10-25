# KYROS Backend API

API REST para el sistema de gestión de hogar inteligente KYROS.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Modelos de Datos](#modelos-de-datos)

## Instalación

```bash
cd database
npm install
```

## Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita `.env` con tus configuraciones:
```env
MONGODB_URI=tu_conexion_mongodb
DB_NAME=Kyros
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_clave_secreta
JWT_EXPIRE=7d
CORS_ORIGIN=*
```

## Uso

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

### Servidor Legacy
```bash
npm run legacy
```

El servidor estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
database/
├── config/
│   └── database.js          # Configuración de MongoDB
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   ├── roomController.js    # Lógica de habitaciones
│   └── deviceController.js  # Lógica de dispositivos
├── middleware/
│   ├── auth.js             # Middleware de autenticación
│   └── errorHandler.js     # Manejo de errores
├── models/
│   ├── User.js             # Modelo de usuarios
│   ├── Room.js             # Modelo de habitaciones
│   ├── Device.js           # Modelo de dispositivos
│   ├── DeviceData.js       # Modelo de datos de dispositivos
│   ├── Camera.js           # Modelo de cámaras
│   ├── Task.js             # Modelo de tareas
│   └── Automatize.js       # Modelo de automatizaciones
├── routes/
│   ├── auth.js             # Rutas de autenticación
│   ├── rooms.js            # Rutas de habitaciones
│   └── devices.js          # Rutas de dispositivos
├── .env                    # Variables de entorno (NO COMMITEAR)
├── .env.example            # Plantilla de variables de entorno
├── server.js               # Servidor principal
└── connect.js              # Servidor legacy (obsoleto)
```

## API Endpoints

### Autenticación

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Registro exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "tipo": "estudiante",
    "estado": "activo"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "tipo": "estudiante"
  }
}
```

#### Obtener Perfil
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Actualizar Perfil
```http
PUT /api/auth/updateprofile
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez",
  "estudiante": {
    "matricula": "2021001",
    "rutaPreferida": "Ruta 3"
  }
}
```

#### Cambiar Contraseña
```http
PUT /api/auth/updatepassword
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

### Habitaciones (Rooms)

#### Obtener Todas las Habitaciones
```http
GET /api/rooms
Authorization: Bearer {token}
```

#### Obtener Una Habitación
```http
GET /api/rooms/:id
Authorization: Bearer {token}
```

#### Crear Habitación
```http
POST /api/rooms
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Sala",
  "descripcion": "Sala principal de la casa",
  "icono": "Sofa--Streamline-Flex.png",
  "configuracion": {
    "mostrarEnDashboard": true,
    "orden": 1
  }
}
```

#### Actualizar Habitación
```http
PUT /api/rooms/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Sala Principal",
  "descripcion": "Sala renovada"
}
```

#### Eliminar Habitación
```http
DELETE /api/rooms/:id
Authorization: Bearer {token}
```

#### Obtener Dispositivos de una Habitación
```http
GET /api/rooms/:id/devices
Authorization: Bearer {token}
```

### Dispositivos (Devices)

#### Obtener Todos los Dispositivos
```http
GET /api/devices
Authorization: Bearer {token}

# Con filtros opcionales:
GET /api/devices?tipo=luz&habitacion=507f1f77bcf86cd799439011
```

#### Obtener Un Dispositivo
```http
GET /api/devices/:id
Authorization: Bearer {token}
```

#### Crear Dispositivo
```http
POST /api/devices
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Luz Principal",
  "tipo": "luz",
  "marca": "Philips",
  "modelo": "Hue",
  "habitacion": "507f1f77bcf86cd799439011",
  "configuracion": {
    "brillo": 80,
    "color": "#FFD700"
  }
}
```

#### Actualizar Dispositivo
```http
PUT /api/devices/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Luz Principal Renovada",
  "configuracion": {
    "brillo": 100
  }
}
```

#### Eliminar Dispositivo
```http
DELETE /api/devices/:id
Authorization: Bearer {token}
```

#### Encender/Apagar Dispositivo (Toggle)
```http
PUT /api/devices/:id/toggle
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Dispositivo encendido",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Luz Principal",
    "estado": {
      "encendido": true,
      "conectado": true,
      "ultimaConexion": "2025-10-24T18:30:00.000Z"
    }
  }
}
```

#### Obtener Datos Históricos de Dispositivo
```http
GET /api/devices/:id/data
Authorization: Bearer {token}

# Con filtros opcionales:
GET /api/devices/:id/data?tipo=temperatura&limit=50&desde=2025-10-20&hasta=2025-10-24
```

**Respuesta:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "dispositivo": "507f1f77bcf86cd799439011",
      "tipo": "temperatura",
      "valor": 22.5,
      "unidad": "°C",
      "timestamp": "2025-10-24T18:30:00.000Z"
    }
  ]
}
```

### Health Check
```http
GET /api/health
```

**Respuesta:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2025-10-24T18:30:00.000Z"
}
```

## Modelos de Datos

### Usuario
```javascript
{
  nombre: String,
  email: String (único),
  password: String (hasheado),
  tipo: String (estudiante/admin),
  estado: String (activo/inactivo/suspendido),
  fechaRegistro: Date,
  estudiante: {
    matricula: String,
    rutaPreferida: String,
    searchHistory: Number
  }
}
```

### Habitación
```javascript
{
  nombre: String,
  descripcion: String,
  icono: String,
  usuario: ObjectId (ref: Usuario),
  configuracion: {
    mostrarEnDashboard: Boolean,
    orden: Number
  }
}
```

### Dispositivo
```javascript
{
  nombre: String,
  tipo: String (luz/termostato/cerradura/sensor/camara/enchufe/ventilador/otro),
  marca: String,
  modelo: String,
  habitacion: ObjectId (ref: Room),
  usuario: ObjectId (ref: Usuario),
  estado: {
    encendido: Boolean,
    conectado: Boolean,
    ultimaConexion: Date
  },
  configuracion: {
    brillo: Number,
    color: String,
    temperatura: Number,
    valorActual: Mixed,
    notificacionesActivas: Boolean
  },
  hardware: {
    mac: String,
    ip: String,
    firmware: String
  }
}
```

### Datos de Dispositivo
```javascript
{
  dispositivo: ObjectId (ref: Device),
  tipo: String (temperatura/humedad/movimiento/luz/energia/estado/otro),
  valor: Mixed,
  unidad: String,
  timestamp: Date
}
```

## Autenticación

El API usa JWT (JSON Web Tokens) para autenticación. Después de login o registro, recibirás un token que debe incluirse en las peticiones protegidas:

```http
Authorization: Bearer {tu_token_aqui}
```

El token expira en 7 días por defecto (configurable en `.env`).

## Manejo de Errores

Todos los errores siguen el siguiente formato:

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": ["Error 1", "Error 2"]  // Opcional, para errores de validación
}
```

### Códigos de Estado HTTP

- `200` - OK
- `201` - Creado exitosamente
- `400` - Petición inválida
- `401` - No autorizado
- `403` - Prohibido
- `404` - No encontrado
- `409` - Conflicto (ej: email duplicado)
- `500` - Error interno del servidor

## Notas de Seguridad

- Las contraseñas se hashean usando bcrypt
- Los tokens JWT están firmados y tienen expiración
- CORS está configurado para permitir todos los orígenes en desarrollo
- En producción, configura `CORS_ORIGIN` con tu dominio específico
- Nunca subas el archivo `.env` al repositorio

## Próximos Pasos

Para expandir el backend, puedes:

1. Crear controladores para `Camera`, `Task` y `Automatize`
2. Agregar rutas adicionales para estos módulos
3. Implementar websockets para actualizaciones en tiempo real
4. Agregar paginación a los endpoints GET
5. Implementar rate limiting para seguridad
6. Agregar tests unitarios e integración
7. Documentar con Swagger/OpenAPI

## Soporte

Para más información sobre el proyecto, consulta `CLAUDE.md` en la raíz del repositorio.
