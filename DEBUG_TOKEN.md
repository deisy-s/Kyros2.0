# 🔍 Debug del Problema del Token

## Checklist de Verificación:

### ✅ 1. Verificar que el Header esté correcto

**En Thunder Client, pestaña Headers, debe verse EXACTAMENTE así:**

```
┌──────────────────┬────────────────────────────────────────┐
│ Name             │ Value                                  │
├──────────────────┼────────────────────────────────────────┤
│ Authorization    │ Bearer eyJhbGciOiJIUzI1NiIsInR5cCI... │
└──────────────────┴────────────────────────────────────────┘
```

**Errores comunes:**
- ❌ `authorization` (minúscula "a") → debe ser `Authorization` (mayúscula "A")
- ❌ `Bearer` sin espacio después
- ❌ Espacio extra antes de "Bearer"
- ❌ Token sin "Bearer " al inicio

---

### ✅ 2. Verificar que NO haya nada en Query

**Pestaña "Query" debe estar VACÍA:**

```
┌──────────────────┬────────────────────────────────────────┐
│ Name             │ Value                                  │
├──────────────────┼────────────────────────────────────────┤
│                  │                                        │  ← VACÍO
└──────────────────┴────────────────────────────────────────┘
```

---

### ✅ 3. Verificar la URL

**URL debe ser EXACTAMENTE:**
```
http://localhost:3000/api/auth/me
```

**NO debe tener:**
- ❌ `?Name=...`
- ❌ `?Authorization=...`
- ❌ Ningún parámetro después de `/me`

---

### ✅ 4. Verificar que el token sea el correcto

El token que recibiste en la respuesta del REGISTRO (Paso 2) debe verse así:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

**Asegúrate de copiar TODO el valor de `"token"`, que es MUY largo.**

---

## 🧪 Prueba de Diagnóstico

Vamos a probar si el problema es el token o la configuración:

### Prueba A: Verificar que el endpoint funciona SIN token

**Thunder Client:**
1. Nueva petición
2. Método: `GET`
3. URL: `http://localhost:3000/api/auth/me`
4. Headers: (vacío, NO pongas nada)
5. Send

**Resultado esperado:**
```json
{
  "success": false,
  "message": "No autorizado. Token no proporcionado"
}
```

Si ves esto → El endpoint funciona correctamente, el problema es cómo estás enviando el token.

---

### Prueba B: Verificar el formato del header

**Copia EXACTAMENTE este texto y pégalo en el valor del header:**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmM3OTYwYmFiYTJjOGU3NTU0YWNiNiIsImlhdCI6MTc2MTM3NjYwOSwiZXhwIjoxNzYxOTgxNDA5fQ.ju5TwJWH6JwumfIzZMMr2nlNhW6uMHAPVdhOGVk6_8E
```

**Configuración:**
- Name: `Authorization`
- Value: (pega el texto de arriba)

---

## 📸 Screenshot de Referencia

Así debe verse tu Thunder Client:

```
┌─────────────────────────────────────────────────────────────┐
│ GET ▼  http://localhost:3000/api/auth/me            [Send] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ○ Query   ● Headers   ○ Body   ○ Auth   ○ Tests   ○ Script│
│                                                              │
│ Headers                                                      │
│ ┌────────────────┬──────────────────────────────────────┐  │
│ │ Name           │ Value                                │  │
│ ├────────────────┼──────────────────────────────────────┤  │
│ │ Authorization  │ Bearer eyJhbGciOiJIUzI1NiIsInR5c... │  │
│ └────────────────┴──────────────────────────────────────┘  │
│                                                              │
│ [✓] Enable                                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Importante:** Asegúrate de que el checkbox [✓] Enable esté marcado al lado del header.

---

## 🔄 Si TODAVÍA no funciona:

### Opción 1: Hacer Login de nuevo

Puede que el token del registro haya tenido algún problema. Haz login de nuevo:

**Thunder Client:**
1. Método: `POST`
2. URL: `http://localhost:3000/api/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "email": "juan@kyros.com",
  "password": "password123"
}
```
5. Send

**Copia el nuevo token que te dé y úsalo.**

---

### Opción 2: Verificar que el servidor esté usando el archivo correcto

En la terminal donde está corriendo el servidor, deberías ver:

```
[dotenv@17.2.3] injecting env (7) from .env
```

Si NO ves esto, el servidor no está cargando el .env correctamente.

---

## 📝 Formato EXACTO del Header

**Nombre del header:**
```
Authorization
```

**Valor del header (con tu token):**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmM3OTYwYmFiYTJjOGU3NTU0YWNiNiIsImlhdCI6MTc2MTM3NjYwOSwiZXhwIjoxNzYxOTgxNDA5fQ.ju5TwJWH6JwumfIzZMMr2nlNhW6uMHAPVdhOGVk6_8E
```

**Puntos importantes:**
1. "Bearer" con "B" mayúscula
2. UN espacio después de "Bearer"
3. El token completo pegado después del espacio
4. SIN espacios adicionales al inicio o al final

---

## 💡 Tip: Cómo copiar el token correctamente

Cuando veas la respuesta del registro/login en Thunder Client:

1. Busca la línea: `"token": "eyJhbGci..."`
2. Haz doble click sobre el valor (la parte entre comillas)
3. Copia (Ctrl+C)
4. Ve a Headers
5. En Value, escribe: `Bearer ` (con espacio)
6. Pega el token (Ctrl+V)

**Resultado final:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

Si después de seguir todos estos pasos TODAVÍA no funciona, comparte:
1. Screenshot de tu Thunder Client (pestañas Headers y Query)
2. La respuesta COMPLETA que te dio el registro/login
