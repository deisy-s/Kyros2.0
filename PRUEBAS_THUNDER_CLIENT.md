# 🧪 Guía de Pruebas con Thunder Client

## 📋 Checklist Previo

Antes de empezar las pruebas, asegúrate de:

1. ✅ Tener el servidor corriendo:
```bash
cd database
npm start
```

2. ✅ Verificar que el servidor responde:
   - Abre http://localhost:3000/api/health en tu navegador
   - Deberías ver: `{"success": true, "message": "API funcionando correctamente"}`

3. ✅ Tener Thunder Client instalado en VS Code

---

## 🚀 Flujo de Pruebas Completo

### PASO 1: Health Check

**Verificar que el servidor funciona**

```
Método: GET
URL: http://localhost:3000/api/health
Headers: (ninguno necesario)
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2025-10-24T..."
}
```

---

### PASO 2: Registro de Usuario

**Crear tu primera cuenta**

```
Método: POST
URL: http://localhost:3000/api/auth/register
Headers:
  Content-Type: application/json

Body (JSON):
{
  "nombre": "Juan Pérez",
  "email": "juan@kyros.com",
  "password": "password123"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Registro exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67...",
    "nombre": "Juan Pérez",
    "email": "juan@kyros.com",
    "tipo": "estudiante",
    "estado": "activo",
    "assignedBus": null,
    "estudiante": {
      "matricula": "",
      "rutaPreferida": "",
      "searchHistory": 0
    },
    "fechaRegistro": "2025-10-24T..."
  }
}
```

**⚠️ IMPORTANTE:** Copia el valor del campo `token` - lo necesitarás para las siguientes pruebas.

---

### PASO 3: Login

**Iniciar sesión con el usuario creado**

```
Método: POST
URL: http://localhost:3000/api/auth/login
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "juan@kyros.com",
  "password": "password123"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67...",
    "nombre": "Juan Pérez",
    "email": "juan@kyros.com",
    "tipo": "estudiante"
  }
}
```

---

### PASO 4: Obtener Perfil (Requiere Auth)

**Ver tu perfil de usuario**

```
Método: GET
URL: http://localhost:3000/api/auth/me
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
```

**Ejemplo:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTY0...
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "67...",
    "nombre": "Juan Pérez",
    "email": "juan@kyros.com",
    "tipo": "estudiante",
    "estado": "activo",
    ...
  }
}
```

---

### PASO 5: Crear Habitación (Requiere Auth)

**Crear tu primera habitación**

```
Método: POST
URL: http://localhost:3000/api/rooms
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
  Content-Type: application/json

Body (JSON):
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

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Habitación creada exitosamente",
  "data": {
    "_id": "67...",
    "nombre": "Sala",
    "descripcion": "Sala principal de la casa",
    "icono": "Sofa--Streamline-Flex.png",
    "usuario": "67...",
    "configuracion": {
      "mostrarEnDashboard": true,
      "orden": 1
    },
    "createdAt": "2025-10-24T...",
    "updatedAt": "2025-10-24T..."
  }
}
```

**⚠️ IMPORTANTE:** Guarda el `_id` de la habitación - lo necesitarás para crear dispositivos.

---

### PASO 6: Listar Habitaciones (Requiere Auth)

**Ver todas tus habitaciones**

```
Método: GET
URL: http://localhost:3000/api/rooms
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
```

**Respuesta esperada:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67...",
      "nombre": "Sala",
      "descripcion": "Sala principal de la casa",
      ...
    }
  ]
}
```

---

### PASO 7: Crear Dispositivo (Requiere Auth)

**Agregar un dispositivo a la habitación**

```
Método: POST
URL: http://localhost:3000/api/devices
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
  Content-Type: application/json

Body (JSON):
{
  "nombre": "Luz Principal",
  "tipo": "luz",
  "marca": "Philips",
  "modelo": "Hue White",
  "habitacion": "ID_DE_TU_HABITACION_AQUI",
  "configuracion": {
    "brillo": 80,
    "color": "#FFD700"
  },
  "hardware": {
    "mac": "00:11:22:33:44:55",
    "ip": "192.168.1.100"
  }
}
```

**Reemplaza `ID_DE_TU_HABITACION_AQUI` con el `_id` de la habitación del paso 5**

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Dispositivo creado exitosamente",
  "data": {
    "_id": "67...",
    "nombre": "Luz Principal",
    "tipo": "luz",
    "marca": "Philips",
    "modelo": "Hue White",
    "habitacion": "67...",
    "usuario": "67...",
    "estado": {
      "encendido": false,
      "conectado": false,
      "ultimaConexion": "2025-10-24T..."
    },
    "configuracion": {
      "brillo": 80,
      "color": "#FFD700",
      ...
    },
    ...
  }
}
```

**⚠️ IMPORTANTE:** Guarda el `_id` del dispositivo.

---

### PASO 8: Encender/Apagar Dispositivo (Requiere Auth)

**Toggle del estado del dispositivo**

```
Método: PUT
URL: http://localhost:3000/api/devices/ID_DEL_DISPOSITIVO/toggle
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
```

**Reemplaza `ID_DEL_DISPOSITIVO` con el `_id` del dispositivo del paso 7**

**Respuesta esperada (primera vez - encendido):**
```json
{
  "success": true,
  "message": "Dispositivo encendido",
  "data": {
    "_id": "67...",
    "nombre": "Luz Principal",
    "estado": {
      "encendido": true,
      "conectado": false,
      "ultimaConexion": "2025-10-24T..."
    },
    ...
  }
}
```

**Pruébalo de nuevo para apagarlo - el mensaje cambiará a "Dispositivo apagado"**

---

### PASO 9: Listar Dispositivos (Requiere Auth)

**Ver todos tus dispositivos**

```
Método: GET
URL: http://localhost:3000/api/devices
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
```

**Con filtros opcionales:**
```
URL: http://localhost:3000/api/devices?tipo=luz
URL: http://localhost:3000/api/devices?habitacion=ID_HABITACION
```

**Respuesta esperada:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67...",
      "nombre": "Luz Principal",
      "tipo": "luz",
      "habitacion": {
        "_id": "67...",
        "nombre": "Sala",
        "icono": "Sofa--Streamline-Flex.png"
      },
      ...
    }
  ]
}
```

---

### PASO 10: Actualizar Dispositivo (Requiere Auth)

**Modificar configuración del dispositivo**

```
Método: PUT
URL: http://localhost:3000/api/devices/ID_DEL_DISPOSITIVO
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
  Content-Type: application/json

Body (JSON):
{
  "nombre": "Luz Principal Sala",
  "configuracion": {
    "brillo": 100,
    "color": "#FFFFFF"
  }
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Dispositivo actualizado exitosamente",
  "data": {
    "_id": "67...",
    "nombre": "Luz Principal Sala",
    "configuracion": {
      "brillo": 100,
      "color": "#FFFFFF",
      ...
    },
    ...
  }
}
```

---

## 🎯 Pruebas de Validación y Errores

### Error 401: No Autorizado

**Intenta acceder sin token:**

```
Método: GET
URL: http://localhost:3000/api/rooms
Headers: (sin Authorization)
```

**Respuesta esperada:**
```json
{
  "success": false,
  "message": "No autorizado. Token no proporcionado"
}
```

---

### Error 409: Email Duplicado

**Intenta registrar el mismo email dos veces:**

```
Método: POST
URL: http://localhost:3000/api/auth/register
Body (JSON):
{
  "nombre": "Test",
  "email": "juan@kyros.com",  // Email ya usado
  "password": "123456"
}
```

**Respuesta esperada:**
```json
{
  "success": false,
  "message": "El correo electrónico ya está registrado"
}
```

---

### Error 400: Validación

**Intenta crear dispositivo sin campos requeridos:**

```
Método: POST
URL: http://localhost:3000/api/devices
Headers:
  Authorization: Bearer TU_TOKEN_AQUI
  Content-Type: application/json

Body (JSON):
{
  "nombre": "Dispositivo Test"
  // Falta "tipo" y "habitacion"
}
```

**Respuesta esperada:**
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "Por favor especifique el tipo de dispositivo",
    "El dispositivo debe estar asignado a una habitación"
  ]
}
```

---

## 📦 Colección Thunder Client

Para facilitar las pruebas, puedes importar esta colección en Thunder Client:

1. Clic en "Collections" en Thunder Client
2. Clic en el menú "..." → "Import"
3. Copia y pega el JSON del archivo `thunder-collection.json` (lo creo a continuación)

---

## ✅ Checklist de Pruebas Completo

- [ ] Health check funciona
- [ ] Registro de usuario exitoso
- [ ] Login exitoso y recibe token
- [ ] Perfil se obtiene con token
- [ ] Crear habitación funciona
- [ ] Listar habitaciones muestra las creadas
- [ ] Crear dispositivo en habitación funciona
- [ ] Toggle de dispositivo cambia estado
- [ ] Listar dispositivos muestra los creados
- [ ] Actualizar dispositivo modifica datos
- [ ] Error 401 sin token funciona
- [ ] Error 409 email duplicado funciona
- [ ] Error 400 validación funciona

---

## 🔧 Solución de Problemas

### "Cannot connect to server"
- Verifica que el servidor esté corriendo: `npm start` en carpeta database
- Verifica la URL: debe ser `http://localhost:3000`

### "Token inválido"
- Asegúrate de incluir "Bearer " antes del token
- Verifica que copiaste el token completo
- El token expira en 7 días - haz login de nuevo si expiró

### "Habitación no encontrada"
- Verifica que estés usando el `_id` correcto
- Asegúrate de que la habitación pertenece a tu usuario

---

## 🎓 Próximos Pasos

Después de completar estas pruebas:

1. ✅ El backend está **100% funcional**
2. 🎨 Puedes empezar a **integrar el frontend**
3. 📱 Todas las llamadas del frontend seguirán este mismo patrón

**Ejemplo de integración en JavaScript:**
```javascript
// Login desde el frontend
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
if (data.success) {
  localStorage.setItem('token', data.token);
  // Redirigir a dashboard
}
```

---

¡Listo para probar! 🚀
