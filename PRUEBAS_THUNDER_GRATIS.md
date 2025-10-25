# 🧪 Guía de Pruebas - Thunder Client GRATIS

## 🎯 Guía Paso a Paso (Sin Colecciones)

Como Thunder Client gratis no permite colecciones, aquí tienes las peticiones una por una para copiar y pegar.

---

## ✅ PASO 0: Verificar que el Servidor Funciona

### Iniciar el servidor
```bash
cd database
npm start
```

Deberías ver:
```
[KYROS] Servidor iniciado en modo development
[Express] Escuchando en http://localhost:3000
[MongoDB] Conexión exitosa a Kyros
```

---

## 🧪 PRUEBAS EN ORDEN

### 📍 PRUEBA 1: Health Check

**En Thunder Client:**
1. Clic en "New Request"
2. Método: `GET`
3. URL: `http://localhost:3000/api/health`
4. Clic en "Send"

**✅ Resultado esperado:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "..."
}
```

**Si ves esto → El servidor funciona correctamente** ✅

---

### 📍 PRUEBA 2: Registrar Usuario

**En Thunder Client:**
1. Nueva petición
2. Método: `POST`
3. URL: `http://localhost:3000/api/auth/register`
4. Tab "Headers":
   - Name: `Content-Type`
   - Value: `application/json`
5. Tab "Body" → selecciona "JSON"
6. Pega esto:
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@kyros.com",
  "password": "password123"
}
```
7. Clic en "Send"

**✅ Resultado esperado:**
```json
{
  "success": true,
  "message": "Registro exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "671...",
    "nombre": "Juan Pérez",
    "email": "juan@kyros.com",
    "tipo": "estudiante",
    ...
  }
}
```

**🔴 MUY IMPORTANTE:**
- Copia el valor de `"token"` (todo el texto largo)
- Pégalo en un bloc de notas temporal
- Lo necesitarás para TODAS las siguientes pruebas

---

### 📍 PRUEBA 3: Login

**En Thunder Client:**
1. Nueva petición
2. Método: `POST`
3. URL: `http://localhost:3000/api/auth/login`
4. Tab "Headers":
   - Name: `Content-Type`
   - Value: `application/json`
5. Tab "Body" → JSON:
```json
{
  "email": "juan@kyros.com",
  "password": "password123"
}
```
6. Send

**✅ Resultado:** Debería darte otro token (también guárdalo)

---

### 📍 PRUEBA 4: Ver Mi Perfil (Requiere Token)

**En Thunder Client:**
1. Nueva petición
2. Método: `GET`
3. URL: `http://localhost:3000/api/auth/me`
4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`

   **⚠️ IMPORTANTE:** Reemplaza `TU_TOKEN_AQUI` con el token del paso 2

   **Ejemplo:**
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTY0...
   ```

   **Nota:** Debe haber un espacio después de "Bearer"

5. Send

**✅ Resultado:** Debería mostrar tu perfil completo

---

### 📍 PRUEBA 5: Crear Habitación (Requiere Token)

**En Thunder Client:**
1. Nueva petición
2. Método: `POST`
3. URL: `http://localhost:3000/api/rooms`
4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`
   - Name: `Content-Type`
   - Value: `application/json`
5. Tab "Body" → JSON:
```json
{
  "nombre": "Sala",
  "descripcion": "Sala principal de la casa",
  "icono": "Sofa--Streamline-Flex.png"
}
```
6. Send

**✅ Resultado:**
```json
{
  "success": true,
  "message": "Habitación creada exitosamente",
  "data": {
    "_id": "671...",
    "nombre": "Sala",
    ...
  }
}
```

**🔴 MUY IMPORTANTE:**
- Copia el valor de `"_id"` de la habitación
- Lo necesitarás para crear dispositivos

---

### 📍 PRUEBA 6: Ver Mis Habitaciones

**En Thunder Client:**
1. Nueva petición
2. Método: `GET`
3. URL: `http://localhost:3000/api/rooms`
4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`
5. Send

**✅ Resultado:** Lista de todas tus habitaciones

---

### 📍 PRUEBA 7: Crear Dispositivo (Requiere Token + Room ID)

**En Thunder Client:**
1. Nueva petición
2. Método: `POST`
3. URL: `http://localhost:3000/api/devices`
4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`
   - Name: `Content-Type`
   - Value: `application/json`
5. Tab "Body" → JSON:
```json
{
  "nombre": "Luz Principal",
  "tipo": "luz",
  "marca": "Philips",
  "modelo": "Hue White",
  "habitacion": "PEGA_AQUI_EL_ID_DE_LA_HABITACION",
  "configuracion": {
    "brillo": 80,
    "color": "#FFD700"
  }
}
```

**⚠️ IMPORTANTE:** En `"habitacion"`, reemplaza `PEGA_AQUI_EL_ID_DE_LA_HABITACION` con el `_id` de la habitación del Paso 5

**Ejemplo:**
```json
{
  "nombre": "Luz Principal",
  "tipo": "luz",
  "marca": "Philips",
  "modelo": "Hue White",
  "habitacion": "671642a1b2c3d4e5f6789012",
  "configuracion": {
    "brillo": 80,
    "color": "#FFD700"
  }
}
```

6. Send

**✅ Resultado:**
```json
{
  "success": true,
  "message": "Dispositivo creado exitosamente",
  "data": {
    "_id": "671...",
    "nombre": "Luz Principal",
    "estado": {
      "encendido": false,
      ...
    }
  }
}
```

**🔴 MUY IMPORTANTE:**
- Copia el `"_id"` del dispositivo
- Lo necesitarás para encenderlo/apagarlo

---

### 📍 PRUEBA 8: Encender/Apagar Dispositivo (Toggle)

**En Thunder Client:**
1. Nueva petición
2. Método: `PUT`
3. URL: `http://localhost:3000/api/devices/DEVICE_ID_AQUI/toggle`

   **Reemplaza `DEVICE_ID_AQUI` con el ID del dispositivo del Paso 7**

   **Ejemplo:**
   ```
   http://localhost:3000/api/devices/671642a1b2c3d4e5f6789999/toggle
   ```

4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`
5. Send

**✅ Resultado (primera vez - enciende):**
```json
{
  "success": true,
  "message": "Dispositivo encendido",
  "data": {
    "estado": {
      "encendido": true,
      ...
    }
  }
}
```

**Prueba de nuevo (segunda vez - apaga):**
- Send otra vez
- El mensaje cambiará a `"Dispositivo apagado"`
- `"encendido": false`

---

### 📍 PRUEBA 9: Ver Mis Dispositivos

**En Thunder Client:**
1. Nueva petición
2. Método: `GET`
3. URL: `http://localhost:3000/api/devices`
4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`
5. Send

**✅ Resultado:** Lista de todos tus dispositivos

---

### 📍 PRUEBA 10: Actualizar Dispositivo

**En Thunder Client:**
1. Nueva petición
2. Método: `PUT`
3. URL: `http://localhost:3000/api/devices/DEVICE_ID_AQUI`
4. Tab "Headers":
   - Name: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`
   - Name: `Content-Type`
   - Value: `application/json`
5. Tab "Body" → JSON:
```json
{
  "nombre": "Luz Principal Sala",
  "configuracion": {
    "brillo": 100,
    "color": "#FFFFFF"
  }
}
```
6. Send

**✅ Resultado:** Dispositivo actualizado con los nuevos valores

---

## 🎯 RESUMEN DE LO QUE NECESITAS GUARDAR

Mientras haces las pruebas, anota estos valores:

```
TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
       ↑ Del Paso 2 (Register) o 3 (Login)

ROOM_ID: 671642a1b2c3d4e5f6789012
         ↑ Del Paso 5 (Create Room)

DEVICE_ID: 671642a1b2c3d4e5f6789999
           ↑ Del Paso 7 (Create Device)
```

---

## 🧪 PRUEBAS DE ERRORES (Opcional)

### Error 401: Sin Token

**Thunder Client:**
1. Nueva petición
2. Método: `GET`
3. URL: `http://localhost:3000/api/rooms`
4. **NO pongas el header Authorization**
5. Send

**✅ Debe dar error:**
```json
{
  "success": false,
  "message": "No autorizado. Token no proporcionado"
}
```

---

### Error 409: Email Duplicado

**Thunder Client:**
1. Intenta registrar otro usuario con el mismo email:
2. POST `http://localhost:3000/api/auth/register`
3. Body:
```json
{
  "nombre": "Otra Persona",
  "email": "juan@kyros.com",
  "password": "123456"
}
```

**✅ Debe dar error:**
```json
{
  "success": false,
  "message": "El correo electrónico ya está registrado"
}
```

---

## ✅ CHECKLIST DE PRUEBAS

Marca cada prueba que completes:

- [ ] Health Check funciona
- [ ] Registro de usuario exitoso (token recibido)
- [ ] Login exitoso (token recibido)
- [ ] Ver perfil funciona con token
- [ ] Crear habitación funciona
- [ ] Ver habitaciones lista la creada
- [ ] Crear dispositivo funciona
- [ ] Toggle dispositivo enciende/apaga
- [ ] Ver dispositivos lista los creados
- [ ] Actualizar dispositivo modifica datos
- [ ] Error 401 sin token funciona
- [ ] Error 409 email duplicado funciona

---

## 💡 TIPS PARA THUNDER CLIENT GRATIS

### Guardar Peticiones
- Thunder Client gratis SÍ permite guardar peticiones individuales
- Clic en "Save" después de crear cada petición
- Nómbralas bien: "1. Register", "2. Login", etc.

### Reutilizar el Token
- Una vez que tengas el token, puedes:
  1. Guardarlo en un archivo .txt
  2. Copiarlo y pegarlo en cada nueva petición
  3. El token dura 7 días, así que no necesitas hacer login cada vez

### Tipos de Dispositivos Disponibles
Puedes crear dispositivos de estos tipos:
- `"luz"`
- `"termostato"`
- `"cerradura"`
- `"sensor"`
- `"camara"`
- `"enchufe"`
- `"ventilador"`
- `"otro"`

---

## 🆘 Solución de Problemas

### "Cannot connect"
- Verifica que el servidor esté corriendo: `npm start` en database/
- URL debe ser exactamente: `http://localhost:3000`

### "Token inválido"
- Verifica que copiaste "Bearer " + el token completo
- Asegúrate de que hay un espacio después de "Bearer"
- El token expira en 7 días

### "Habitación no encontrada"
- Verifica que copiaste el `_id` correcto del paso 5
- Asegúrate de que es el ID completo (sin comillas extras)

---

## 🎉 ¡Listo!

Una vez que completes estas pruebas, habrás verificado que:
- ✅ La autenticación funciona
- ✅ Puedes crear y gestionar habitaciones
- ✅ Puedes crear y controlar dispositivos
- ✅ El backend está listo para el frontend

**Siguiente paso:** Integrar con tus páginas HTML usando `fetch()` 🚀
