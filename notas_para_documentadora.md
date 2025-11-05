# Notas para la Documentadora - Sistema KYROS

Este documento contiene información técnica del sistema KYROS para facilitar la creación del manual de usuario y documentación técnica.

---

## 1. DESCRIPCIÓN GENERAL DEL SISTEMA

**KYROS** es una aplicación web de gestión de dispositivos IoT (Internet de las Cosas) para hogares inteligentes que permite:
- Gestionar habitaciones de una casa
- Controlar dispositivos inteligentes (luces, sensores, ventiladores, cámaras)
- Programar tareas automáticas
- Monitorear seguridad mediante cámaras
- Visualizar datos históricos de dispositivos

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Tecnologías Utilizadas

| Componente | Tecnología | Versión | Propósito |
|------------|-----------|---------|-----------|
| **Frontend** | HTML5 + JavaScript + Bootstrap | 5.3.8 | Interfaz de usuario |
| **Backend** | Node.js + Express | 5.1.0 | Servidor y API REST |
| **Base de datos** | MongoDB Atlas | - | Almacenamiento en la nube |
| **Autenticación** | JWT (JSON Web Tokens) | - | Sesiones seguras |
| **Encriptación** | bcryptjs | - | Protección de contraseñas |

### 2.2 Estructura de Carpetas del Backend

```
database/                           # Carpeta principal del backend
├── config/                         # Configuraciones
│   └── database.js                 # Conexión a MongoDB Atlas
│
├── controllers/                    # Lógica de negocio
│   ├── authController.js           # Registro, login, perfil
│   ├── roomController.js           # CRUD de habitaciones
│   ├── deviceController.js         # CRUD de dispositivos IoT
│   ├── cameraController.js         # Gestión de cámaras
│   ├── taskController.js           # Tareas programadas
│   └── automatizeController.js     # Reglas de automatización
│
├── middleware/                     # Funciones intermedias
│   ├── auth.js                     # Protección de rutas (JWT)
│   └── errorHandler.js             # Manejo centralizado de errores
│
├── models/                         # Esquemas de base de datos
│   ├── User.js                     # Usuarios del sistema
│   ├── Room.js                     # Habitaciones
│   ├── Device.js                   # Dispositivos IoT
│   ├── DeviceData.js               # Datos históricos/telemetría
│   ├── Camera.js                   # Cámaras de seguridad
│   ├── Task.js                     # Tareas programadas
│   └── Automatize.js               # Reglas de automatización
│
├── routes/                         # Definición de endpoints
│   ├── auth.js                     # Rutas de autenticación
│   ├── rooms.js                    # Rutas de habitaciones
│   ├── devices.js                  # Rutas de dispositivos
│   ├── cameras.js                  # Rutas de cámaras
│   ├── tasks.js                    # Rutas de tareas
│   └── automatize.js               # Rutas de automatización
│
├── .env                            # Variables de entorno (SECRETO)
├── .env.example                    # Plantilla de configuración
├── server.js                       # Archivo principal del servidor
├── package.json                    # Dependencias del proyecto
└── README.md                       # Documentación técnica
```

---

## 3. FUNCIÓN DE CADA COMPONENTE

### 3.1 Controllers (Controladores)

Los controladores contienen la **lógica de negocio** - es decir, qué hace el sistema cuando el usuario realiza una acción.

#### **authController.js** - Control de Usuarios
- **Registro (`register`)**: Crea una nueva cuenta de usuario
  - Verifica que el email no esté duplicado
  - Encripta la contraseña con bcrypt
  - Genera un token JWT para la sesión

- **Login (`login`)**: Inicia sesión
  - Verifica email y contraseña
  - Compara contraseña encriptada
  - Devuelve token JWT válido por 7 días

- **Perfil (`getMe`)**: Obtiene datos del usuario actual
  - Requiere autenticación
  - Devuelve nombre, email, tipo de usuario

- **Actualizar perfil (`updateProfile`)**: Modifica datos personales
- **Cambiar contraseña (`updatePassword`)**: Cambia la contraseña

#### **roomController.js** - Gestión de Habitaciones
- **Listar habitaciones (`getRooms`)**: Muestra todas las habitaciones del usuario
- **Obtener habitación (`getRoom`)**: Detalles de una habitación específica
- **Crear habitación (`createRoom`)**: Agrega una nueva habitación
- **Actualizar habitación (`updateRoom`)**: Modifica nombre o descripción
- **Eliminar habitación (`deleteRoom`)**: Borra una habitación
- **Dispositivos de habitación (`getRoomDevices`)**: Lista dispositivos en esa habitación

#### **deviceController.js** - Control de Dispositivos
- **Listar dispositivos (`getDevices`)**: Muestra todos los dispositivos del usuario
  - Puede filtrar por tipo (luz, sensor, etc.)
  - Puede filtrar por habitación

- **Obtener dispositivo (`getDevice`)**: Detalles de un dispositivo
- **Crear dispositivo (`createDevice`)**: Agrega un nuevo dispositivo
- **Actualizar dispositivo (`updateDevice`)**: Modifica configuración
- **Eliminar dispositivo (`deleteDevice`)**: Borra un dispositivo
- **Encender/Apagar (`toggleDevice`)**: Cambia el estado del dispositivo
- **Obtener datos (`getDeviceData`)**: Histórico de telemetría

#### **cameraController.js** - Cámaras de Seguridad
- Control de cámaras de vigilancia
- Grabación y detección de movimiento
- URLs de streaming en vivo
- Grabaciones históricas

#### **taskController.js** - Tareas Programadas
- **Crear tarea**: Programa una acción automática
  - Ej: "Encender luz de sala a las 6:00 PM"
- **Tipos de tareas**:
  - **Manual**: Se ejecuta bajo demanda
  - **Programada**: Se ejecuta en horario específico
  - **Evento**: Se activa por una condición (temperatura, movimiento, etc.)

#### **automatizeController.js** - Automatización Avanzada
- Reglas complejas con múltiples condiciones
- Ej: "Si temperatura > 25°C Y hora > 2:00 PM, entonces encender ventilador"

### 3.2 Middleware (Funciones Intermedias)

#### **auth.js** - Protección de Rutas
```javascript
protect() // Verifica que el usuario tenga un token JWT válido
authorize('admin', 'usuario') // Verifica permisos por rol
```

**Cómo funciona:**
1. Usuario envía petición con token en el header
2. Middleware verifica que el token sea válido
3. Si es válido, permite el acceso
4. Si no, devuelve error 401 (No autorizado)

#### **errorHandler.js** - Manejo de Errores
Captura todos los errores y los formatea de manera consistente:
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos"
}
```

### 3.3 Models (Modelos de Datos)

Los modelos definen **la estructura de los datos** en la base de datos.

#### **User.js** - Usuario
```javascript
{
  nombre: String,           // Nombre completo
  email: String,            // Correo (único)
  password: String,         // Contraseña encriptada
  rol: String,              // 'usuario' o 'admin'
  activo: Boolean,          // ¿Cuenta activa?
  createdAt: Date           // Fecha de registro
}
```

#### **Room.js** - Habitación
```javascript
{
  nombre: String,           // "Sala", "Cocina", etc.
  descripcion: String,      // Descripción opcional
  usuario: ObjectId,        // Dueño de la habitación
  icono: String,            // Nombre del icono
  dispositivos: [ObjectId]  // Lista de dispositivos
}
```

#### **Device.js** - Dispositivo IoT
```javascript
{
  nombre: String,           // "Foco 1", "Sensor de temperatura"
  tipo: String,             // 'luz', 'sensor', 'ventilador'
  habitacion: ObjectId,     // Habitación donde está
  usuario: ObjectId,        // Dueño
  estado: Boolean,          // true = encendido, false = apagado
  conexion: String,         // IP o identificador de conexión
  configuracion: Object,    // Parámetros específicos
  ultimaActividad: Date     // Última vez que se usó
}
```

#### **DeviceData.js** - Datos del Dispositivo
```javascript
{
  dispositivo: ObjectId,    // Dispositivo que generó el dato
  tipo: String,             // 'temperatura', 'humedad', 'estado'
  valor: Number,            // Valor numérico
  unidad: String,           // '°C', '%', etc.
  timestamp: Date           // Cuándo se registró
}
```

#### **Camera.js** - Cámara
```javascript
{
  nombre: String,
  habitacion: ObjectId,
  usuario: ObjectId,
  streaming: {
    urlPrincipal: String,   // URL de video en vivo
    tipo: String            // 'rtsp', 'http', etc.
  },
  estado: {
    activa: Boolean,        // ¿Cámara activa?
    grabando: Boolean,      // ¿Grabando ahora?
    deteccionMovimiento: Boolean
  },
  grabaciones: [Object]     // Historial de grabaciones
}
```

#### **Task.js** - Tarea Programada
```javascript
{
  nombre: String,
  usuario: ObjectId,
  tipo: String,             // 'manual', 'programada', 'evento'
  estado: String,           // 'pendiente', 'completada', 'fallida'
  activa: Boolean,
  programacion: {
    tipo: String,           // 'una_vez', 'diaria', 'semanal'
    hora: String,           // "18:00"
    diasSemana: [Number]    // [0,1,2,3,4,5,6]
  },
  acciones: [{
    dispositivo: ObjectId,
    accion: String,         // 'encender', 'apagar', 'ajustar'
    parametros: Object      // Valores específicos
  }],
  ultimaEjecucion: Date,
  proximaEjecucion: Date
}
```

#### **Automatize.js** - Regla de Automatización
```javascript
{
  nombre: String,
  usuario: ObjectId,
  activa: Boolean,
  condiciones: [{
    tipo: String,           // 'temperatura', 'movimiento', 'hora'
    operador: String,       // 'mayor', 'menor', 'igual'
    valor: Mixed,           // Valor a comparar
    dispositivo: ObjectId
  }],
  acciones: [{
    dispositivo: ObjectId,
    accion: String
  }],
  modo: String              // 'and' (todas) u 'or' (cualquiera)
}
```

---

## 4. SEGURIDAD DEL SISTEMA

### 4.1 Autenticación JWT (JSON Web Tokens)

**¿Qué es JWT?**
- Es como un "pase de entrada" digital
- Se genera al iniciar sesión
- Cada petición al servidor debe incluirlo
- Es válido por 7 días

**Proceso de autenticación:**
1. Usuario ingresa email y contraseña
2. Servidor verifica credenciales
3. Si son correctas, genera un token JWT
4. Usuario guarda el token en `localStorage`
5. En cada petición, envía el token en el header
6. Servidor verifica el token antes de responder

### 4.2 Encriptación de Contraseñas

**Tecnología:** bcryptjs con 10 salt rounds

**¿Qué significa?**
- Las contraseñas NUNCA se guardan en texto plano
- Se convierten en un hash irreversible
- Ej: "mipassword123" → "$2a$10$rEjK..."
- Aunque alguien vea la base de datos, no puede leer las contraseñas

### 4.3 Variables de Entorno (.env)

**Archivo crítico que NO debe compartirse:**
```
MONGO_URI=mongodb+srv://usuario:contraseña@cluster...
JWT_SECRET=clave_secreta_super_larga_y_aleatoria
JWT_EXPIRE=7d
NODE_ENV=development
PORT=3000
```

**IMPORTANTE para la documentación:**
- Explicar que cada instalación necesita su propio archivo .env
- Usar .env.example como plantilla
- NUNCA publicar .env en repositorios públicos

### 4.4 Protección de Rutas

**Rutas públicas** (no requieren autenticación):
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Iniciar sesión

**Rutas protegidas** (requieren JWT):
- Todas las demás rutas del sistema
- Si no hay token válido, responde con error 401

### 4.5 CORS (Cross-Origin Resource Sharing)

**Estado actual:** Habilitado para todos los orígenes (`*`)
- **En desarrollo:** OK
- **En producción:** Debe configurarse solo para el dominio específico

---

## 5. CÓMO INICIAR EL SISTEMA

### 5.1 Requisitos Previos

**Software necesario:**
1. **Node.js** (versión 14 o superior)
   - Descargar de: https://nodejs.org
   - Verificar instalación: `node --version`

2. **npm** (se instala con Node.js)
   - Verificar: `npm --version`

3. **Cuenta de MongoDB Atlas** (base de datos en la nube)
   - Registrarse en: https://www.mongodb.com/cloud/atlas

### 5.2 Configuración Inicial

#### Paso 1: Clonar o descargar el proyecto
```bash
# Si se usa git
git clone [url-del-repositorio]
cd Kyros2.0
```

#### Paso 2: Instalar dependencias del backend
```bash
cd database
npm install
```

**¿Qué hace esto?**
- Lee el archivo `package.json`
- Descarga todas las librerías necesarias (express, mongoose, bcrypt, etc.)
- Las guarda en la carpeta `node_modules/`

#### Paso 3: Configurar variables de entorno
```bash
# Copiar la plantilla
cp .env.example .env

# Editar el archivo .env con un editor de texto
nano .env  # o usar cualquier editor
```

**Contenido del .env:**
```
MONGO_URI=mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/kyros
JWT_SECRET=tu_clave_secreta_muy_larga_y_dificil_de_adivinar
JWT_EXPIRE=7d
NODE_ENV=development
PORT=3000
```

**Obtener MONGO_URI:**
1. Ir a MongoDB Atlas (cloud.mongodb.com)
2. Crear un cluster (o usar uno existente)
3. Click en "Connect" → "Connect your application"
4. Copiar la cadena de conexión
5. Reemplazar `<password>` con la contraseña real

### 5.3 Iniciar el Servidor

#### Modo Desarrollo (con auto-reload)
```bash
npm run dev
```
**Explicación:**
- Usa `nodemon` que reinicia el servidor al detectar cambios
- Ideal para desarrollo

#### Modo Producción
```bash
npm start
```
**Explicación:**
- Inicia el servidor sin auto-reload
- Más eficiente para producción

#### Verificar que funciona
```
✓ Mensaje en consola:
  "Servidor corriendo en http://localhost:3000"
  "Base de datos conectada"
```

### 5.4 Acceder a la Aplicación

1. Abrir navegador web
2. Ir a: `http://localhost:3000`
3. Verás la página de inicio de KYROS
4. Registrarte o iniciar sesión

---

## 6. ENDPOINTS DEL API (Para Referencia)

### 6.1 Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Crear nueva cuenta | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Obtener perfil | Sí |
| PUT | `/api/auth/updateprofile` | Actualizar perfil | Sí |
| PUT | `/api/auth/updatepassword` | Cambiar contraseña | Sí |

### 6.2 Habitaciones

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/rooms` | Listar habitaciones | Sí |
| POST | `/api/rooms` | Crear habitación | Sí |
| GET | `/api/rooms/:id` | Ver habitación | Sí |
| PUT | `/api/rooms/:id` | Actualizar habitación | Sí |
| DELETE | `/api/rooms/:id` | Eliminar habitación | Sí |
| GET | `/api/rooms/:id/devices` | Dispositivos de habitación | Sí |

### 6.3 Dispositivos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/devices` | Listar dispositivos | Sí |
| POST | `/api/devices` | Crear dispositivo | Sí |
| GET | `/api/devices/:id` | Ver dispositivo | Sí |
| PUT | `/api/devices/:id` | Actualizar dispositivo | Sí |
| DELETE | `/api/devices/:id` | Eliminar dispositivo | Sí |
| PUT | `/api/devices/:id/toggle` | Encender/Apagar | Sí |
| GET | `/api/devices/:id/data` | Datos históricos | Sí |

### 6.4 Cámaras

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/cameras` | Listar cámaras | Sí |
| POST | `/api/cameras` | Crear cámara | Sí |
| GET | `/api/cameras/:id` | Ver cámara | Sí |
| PUT | `/api/cameras/:id` | Actualizar cámara | Sí |
| DELETE | `/api/cameras/:id` | Eliminar cámara | Sí |
| PUT | `/api/cameras/:id/toggle` | Activar/Desactivar | Sí |

### 6.5 Tareas

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Listar tareas | Sí |
| POST | `/api/tasks` | Crear tarea | Sí |
| GET | `/api/tasks/:id` | Ver tarea | Sí |
| PUT | `/api/tasks/:id` | Actualizar tarea | Sí |
| DELETE | `/api/tasks/:id` | Eliminar tarea | Sí |
| POST | `/api/tasks/:id/execute` | Ejecutar tarea | Sí |

### 6.6 Automatización

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/automatize` | Listar reglas | Sí |
| POST | `/api/automatize` | Crear regla | Sí |
| GET | `/api/automatize/:id` | Ver regla | Sí |
| PUT | `/api/automatize/:id` | Actualizar regla | Sí |
| DELETE | `/api/automatize/:id` | Eliminar regla | Sí |
| PUT | `/api/automatize/:id/toggle` | Activar/Desactivar | Sí |

---

## 7. FLUJOS DE USUARIO (Para Manual)

### 7.1 Registro e Inicio de Sesión

**Flujo de Registro:**
1. Usuario hace clic en "Registrarse"
2. Completa formulario: nombre, email, contraseña
3. Sistema verifica que el email no exista
4. Crea cuenta y automáticamente inicia sesión
5. Genera token JWT válido por 7 días
6. Redirige a página de habitaciones

**Flujo de Login:**
1. Usuario ingresa email y contraseña
2. Sistema verifica credenciales
3. Si son correctas, genera token JWT
4. Guarda token en el navegador
5. Redirige a página principal

### 7.2 Gestión de Habitaciones

**Crear Habitación:**
1. Clic en "Agregar habitación"
2. Ingresar nombre (ej: "Sala", "Cocina")
3. Opcional: Ingresar IP del ESP32
4. Clic en "Guardar"
5. Habitación aparece en la lista

**Editar Habitación:**
1. Clic en el ícono de lápiz junto a la habitación
2. Modificar nombre o IP
3. Clic en "Guardar"
4. Cambios se reflejan inmediatamente

**Eliminar Habitación:**
1. Clic en el ícono de lápiz
2. Clic en "Eliminar"
3. Confirmar eliminación
4. Habitación y dispositivos asociados se eliminan

### 7.3 Gestión de Dispositivos

**Agregar Dispositivo:**
1. Entrar a una habitación
2. Clic en "Agregar dispositivo"
3. Seleccionar tipo (Foco, Sensor, etc.)
4. Ingresar nombre
5. Opcional: Configuración de conexión
6. Clic en "Guardar"

**Controlar Dispositivo:**
1. Entrar a la habitación
2. Clic en el dispositivo
3. Ver estado actual (encendido/apagado)
4. Usar el switch para cambiar estado
5. Ver gráfica de datos históricos

**Editar Dispositivo:**
1. En la lista de dispositivos, clic en ícono de lápiz
2. Modificar nombre, tipo o conexión
3. Clic en "Guardar"

**Eliminar Dispositivo:**
1. Clic en ícono de lápiz
2. Clic en "Eliminar"
3. Confirmar eliminación

### 7.4 Programación de Tareas

**Crear Tarea:**
1. Ir a "Automatización"
2. Clic en "Agregar tarea"
3. Ingresar nombre de la tarea
4. Seleccionar dispositivo
5. Configurar horario o condiciones
6. Clic en "Guardar"

**Tipos de Tareas:**

**A) Tarea de Luz:**
- Encender a cierta hora
- Apagar a cierta hora
- Encender cuando no hay luz (sensor)
- Apagar cuando hay luz

**B) Tarea de Ventilador:**
- Encender a cierta hora
- Encender cuando temperatura > X°C
- Apagar a cierta hora
- Apagar cuando temperatura < X°C

**C) Tarea de Alarma:**
- Sonar a cierta hora específica

---

## 8. MENSAJES DE ERROR COMUNES

### 8.1 Errores de Servidor

| Error | Significado | Solución |
|-------|-------------|----------|
| `Cannot connect to MongoDB` | No se puede conectar a la base de datos | Verificar MONGO_URI en .env |
| `JWT malformed` | Token inválido | Cerrar sesión e iniciar de nuevo |
| `User not found` | Usuario no existe | Verificar email o registrarse |
| `Invalid credentials` | Contraseña incorrecta | Verificar contraseña |
| `Port 3000 already in use` | Puerto ocupado | Cerrar otra instancia del servidor |

### 8.2 Errores de Cliente

| Error | Significado | Solución |
|-------|-------------|----------|
| `Error al cargar habitaciones` | No se pudo conectar al servidor | Verificar que el servidor esté corriendo |
| `No autorizado` | Token expirado o inválido | Iniciar sesión nuevamente |
| `Error al crear dispositivo` | Falta información requerida | Completar todos los campos |

---

## 9. ESTRUCTURA DE RESPUESTAS DEL API

### 9.1 Respuesta Exitosa

```json
{
  "success": true,
  "count": 5,
  "data": {
    // Datos solicitados
  },
  "message": "Operación exitosa"
}
```

### 9.2 Respuesta con Error

```json
{
  "success": false,
  "error": "Descripción del error",
  "message": "Mensaje amigable para el usuario"
}
```

---

## 10. FUNCIONES DEL FRONTEND

### 10.1 Utilidades de Autenticación (js/auth.js)

```javascript
// Funciones principales:

requireAuth()              // Protege páginas, redirige al login si no hay sesión
setAuthToken(token)        // Guarda token en localStorage
getAuthToken()             // Recupera token guardado
removeAuthToken()          // Elimina token (cerrar sesión)
fetchWithAuth(url, options) // Hace peticiones con autenticación automática
```

### 10.2 Funciones de Navegación

```javascript
// Pasar parámetros entre páginas:
window.location.href = `devices.html?roomId=${id}&roomname=${name}`

// Leer parámetros:
getParameterByName('roomId')  // Extrae valores de la URL
```

---

## 11. BASE DE DATOS (MongoDB)

### 11.1 Colecciones

La base de datos "kyros" contiene 7 colecciones:

1. **users** - Cuentas de usuario
2. **rooms** - Habitaciones
3. **devices** - Dispositivos IoT
4. **devices_data** - Telemetría y datos históricos
5. **cameras** - Cámaras de seguridad
6. **tasks** - Tareas programadas
7. **automatize** - Reglas de automatización

### 11.2 Relaciones entre Colecciones

```
Usuario (User)
    └── Habitaciones (Room)
            └── Dispositivos (Device)
                    └── Datos (DeviceData)

    └── Cámaras (Camera)

    └── Tareas (Task)
            └── Acciones → Dispositivos

    └── Reglas (Automatize)
            └── Condiciones → Dispositivos
            └── Acciones → Dispositivos
```

---

## 12. PALABRAS CLAVE PARA GLOSARIO

| Término | Definición |
|---------|------------|
| **API REST** | Interfaz de programación que permite comunicación entre frontend y backend |
| **JWT** | Token de autenticación que identifica al usuario |
| **Middleware** | Funciones que procesan peticiones antes de llegar al controlador |
| **Endpoint** | URL específica del API que realiza una función |
| **CRUD** | Create, Read, Update, Delete - Operaciones básicas de datos |
| **Hash** | Transformación irreversible de texto (usado en contraseñas) |
| **Token** | Clave temporal de autenticación |
| **IoT** | Internet of Things - Dispositivos conectados a internet |
| **Schema** | Estructura de datos definida en un modelo |
| **Telemetría** | Datos enviados automáticamente por dispositivos |

---

## 13. RECOMENDACIONES PARA EL MANUAL

### 13.1 Secciones Sugeridas

1. **Introducción**
   - ¿Qué es KYROS?
   - Beneficios del sistema
   - Requisitos mínimos

2. **Instalación**
   - Paso a paso (usar sección 5 de este documento)
   - Capturas de pantalla
   - Solución de problemas comunes

3. **Primeros Pasos**
   - Crear cuenta
   - Agregar primera habitación
   - Agregar primer dispositivo

4. **Uso del Sistema**
   - Gestión de habitaciones (con capturas)
   - Control de dispositivos
   - Programación de tareas
   - Monitoreo de cámaras
   - Reglas de automatización

5. **Referencia Rápida**
   - Glosario de términos
   - Preguntas frecuentes
   - Tabla de iconos

6. **Solución de Problemas**
   - Errores comunes (usar sección 8)
   - Contacto de soporte

### 13.2 Capturas de Pantalla Necesarias

- [ ] Página de inicio
- [ ] Formulario de registro
- [ ] Formulario de login
- [ ] Lista de habitaciones
- [ ] Formulario agregar habitación
- [ ] Lista de dispositivos
- [ ] Formulario agregar dispositivo
- [ ] Página de información del dispositivo
- [ ] Gráfica de datos históricos
- [ ] Formulario de tarea
- [ ] Lista de tareas
- [ ] Página de seguridad (cámaras)

### 13.3 Diagramas Recomendados

1. **Diagrama de arquitectura**
   - Frontend → Backend → Base de datos

2. **Flujo de autenticación**
   - Login → Token → Peticiones protegidas

3. **Flujo de control de dispositivos**
   - Usuario → Interfaz → API → Dispositivo físico

---

## 14. CONTACTO Y SOPORTE

**Desarrolladores:**
- Instituto Tecnológico Superior de Guasave
- Contacto: 687-123-4567
- Email: test@outlook.com

**Repositorio de código:**
- GitHub: https://github.com/Johlus/Kyros2.0

---

## NOTAS FINALES

- Este documento está actualizado a la fecha del último commit
- La arquitectura puede cambiar en futuras versiones
- Consultar el README.md del proyecto para detalles técnicos adicionales
- Los archivos de prueba (.md) en la raíz contienen ejemplos de uso del API

---

**Fecha de creación:** Noviembre 2025
**Versión del sistema:** 2.0
**Última actualización:** Commit de conexión de botones frontend-backend
