# Integración Frontend-Backend KYROS

## ✅ Integración Completada

Se ha completado la integración del frontend con el backend API REST sin modificar el diseño o la información mostrada en el sitio web.

## 📁 Archivos Nuevos Creados

### `js/auth.js`
Utilidad para manejo de autenticación JWT que incluye:
- `saveToken(token)` - Guardar token en localStorage
- `getToken()` - Obtener token del localStorage
- `removeToken()` - Eliminar token (logout)
- `isAuthenticated()` - Verificar si el usuario está autenticado
- `fetchWithAuth(url, options)` - Hacer peticiones con token JWT
- `requireAuth()` - Proteger páginas (requiere autenticación)
- `getCurrentUser()` - Obtener datos del usuario actual

### `js/navbar.js`
Script para manejar el navbar dinámicamente:
- Muestra "Cerrar sesión" si el usuario está autenticado
- Muestra "Iniciar sesión" si no está autenticado
- Maneja el logout

## 🔧 Páginas Integradas

### Autenticación

#### `login.html`
- ✅ Integrado con `POST /api/auth/login`
- Maneja validación de campos
- Guarda token JWT en localStorage
- Redirige a rooms.html después del login exitoso
- Si ya está autenticado, redirige automáticamente a rooms.html

#### `register.html`
- ✅ Integrado con `POST /api/auth/register`
- Crea nuevos usuarios con hash bcrypt
- Guarda token JWT automáticamente
- Redirige a rooms.html después del registro

### Habitaciones

#### `rooms.html`
- ✅ Integrado con `GET /api/rooms`
- Carga habitaciones dinámicamente del usuario autenticado
- Muestra mensaje si no hay habitaciones
- Protegido con `requireAuth()`
- Navegación a dispositivos con roomId

#### `addroom.html`
- ✅ Integrado con `POST /api/rooms`
- Crea nuevas habitaciones
- Campo IP ESP32 se guarda en descripción
- Redirige a rooms.html después de crear

### Dispositivos

#### `devices.html`
- ✅ Integrado con `GET /api/devices?habitacion={roomId}`
- Carga dispositivos de la habitación
- Muestra estado (Encendido/Apagado)
- Protegido con `requireAuth()`
- Navegación con roomId y deviceId

#### `adddevice.html`
- ✅ Integrado con `POST /api/devices`
- Dropdown para seleccionar tipo de dispositivo
- Mapeo de tipos:
  - Foco, Ventilador → `luz`
  - Sensores, Alarma, Cámara → `sensor`
- Asocia dispositivo a habitación específica

#### `deviceinfo.html`
- ✅ Integrado con `GET /api/devices/:id`
- ✅ Integrado con `GET /api/devices/:id/data`
- ✅ Integrado con `PUT /api/devices/:id/toggle`
- Toggle switch para encender/apagar dispositivo
- Gráfico Chart.js con datos históricos
- Muestra datos de ejemplo si no hay históricos

### Otras Páginas

#### `security.html`
- ✅ Protegida con `requireAuth()`

#### `automatize.html`
- ✅ Protegida con `requireAuth()`

## 🔐 Seguridad

- Todas las páginas privadas están protegidas con `requireAuth()`
- Si el usuario no está autenticado, se redirige automáticamente a login.html
- Si el token es inválido (401), se elimina y redirige a login
- Los tokens JWT expiran en 7 días

## 🎨 Diseño Preservado

- ❌ NO se modificó ningún HTML existente (solo se agregaron scripts)
- ❌ NO se cambiaron textos, placeholders o labels
- ❌ NO se modificaron estilos CSS
- ❌ NO se alteraron clases o IDs existentes
- ✅ SOLO se agregaron event listeners y lógica de API

## 🚀 Cómo Usar

### 1. Iniciar el servidor backend
```bash
cd database
npm start
```

El servidor estará disponible en `http://localhost:3000`

### 2. Acceder a la aplicación
Abrir en el navegador: `http://localhost:3000`

### 3. Flujo de uso
1. Registrarse en `register.html` o iniciar sesión en `login.html`
2. Crear habitaciones en `rooms.html`
3. Agregar dispositivos a cada habitación
4. Controlar dispositivos desde `deviceinfo.html`

## 📊 Endpoints Utilizados

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Perfil del usuario

### Habitaciones
- `GET /api/rooms` - Listar habitaciones
- `POST /api/rooms` - Crear habitación
- `GET /api/rooms/:id` - Obtener habitación específica

### Dispositivos
- `GET /api/devices` - Listar dispositivos (con filtro por habitación)
- `POST /api/devices` - Crear dispositivo
- `GET /api/devices/:id` - Obtener dispositivo
- `PUT /api/devices/:id/toggle` - Encender/apagar dispositivo
- `GET /api/devices/:id/data` - Obtener datos históricos

## 🐛 Debugging

Si algo no funciona:
1. Verificar que el servidor backend esté corriendo
2. Abrir la consola del navegador (F12) para ver errores
3. Verificar que `js/auth.js` se esté cargando correctamente
4. Verificar la variable `API_URL` en `auth.js` (debe ser `http://localhost:3000/api`)

## 📝 Notas

- Los iconos de habitaciones y dispositivos se mapean en los scripts
- Los datos de gráficos son de ejemplo si no hay datos históricos
- El módulo de tareas no está completamente integrado (requiere endpoints adicionales)
- La integración con cámaras de seguridad requiere endpoints adicionales

## ✨ Próximos Pasos (Opcional)

- [ ] Integrar módulo de tareas
- [ ] Integrar módulo de cámaras de seguridad
- [ ] Agregar validaciones de formularios más robustas
- [ ] Implementar mensajes de error más específicos
- [ ] Agregar loading spinners durante las peticiones
- [ ] Implementar refresh automático de datos
