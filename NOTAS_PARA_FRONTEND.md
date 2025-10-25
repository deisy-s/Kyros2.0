# Notas para el Equipo de Frontend - KYROS 2.0

**Fecha:** 25 de Octubre de 2025
**De:** Juan Luis
**Para:** Deisy Margarita 

/*

⠀⢸⠂⠀⠀⠀⠘⣧⠀⠀⣟⠛⠲⢤⡀⠀⠀⣰⠏⠀⠀⠀⠀⠀⢹⡀
⠀⡿⠀⠀⠀⠀⠀⠈⢷⡀⢻⡀⠀⠀⠙⢦⣰⠏⠀⠀⠀⠀⠀⠀⢸⠀
⠀⡇⠀⠀⠀⠀⠀⠀⢀⣻⠞⠛⠀⠀⠀⠀⠻⠀⠀⠀⠀⠀⠀⠀⢸⠀
⠀⡇⠀⠀⠀⠀⠀⠀⠛⠓⠒⠓⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀
⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀
⠀⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⢀⡟⠀
⠀⠘⣇⠀⠘⣿⠋⢹⠛⣿⡇⠀⠀⠀⠀⣿⣿⡇⠀⢳⠉⠀⣠⡾⠁⠀
⣦⣤⣽⣆⢀⡇⠀⢸⡇⣾⡇⠀⠀⠀⠀⣿⣿⡷⠀⢸⡇⠐⠛⠛⣿⠀
⠹⣦⠀⠀⠸⡇⠀⠸⣿⡿⠁⢀⡀⠀⠀⠿⠿⠃⠀⢸⠇⠀⢀⡾⠁⠀
⠀⠈⡿⢠⢶⣡⡄⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⣴⣧⠆⠀⢻⡄⠀⠀
⠀⢸⠃⠀⠘⠉⠀⠀⠀⠠⣄⡴⠲⠶⠴⠃⠀⠀⠀⠉⡀⠀⠀⢻⡄⠀
⠀⠘⠒⠒⠻⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⠞⠛⠒⠛⠋⠁⠀
⠀⠀⠀⠀⠀⠀⠸⣟⠓⠒⠂⠀⠀⠀⠀⠀⠈⢷⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⣦⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣼⣃⡀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⣹⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡆⠀⠀⠀⠀⠀
 
*/

---

## 📋 Resumen Ejecutivo

El backend está **100% completo y funcional**. Durante la integración, hemos implementado algunas funcionalidades del frontend para probar los endpoints. Este documento detalla:

1. ✅ **Integraciones ya realizadas** (por el equipo backend para testing)
2. ⚠️ **Funcionalidades faltantes** que deben implementar
3. 🐛 **Problemas detectados** que necesitan corrección
4. 📚 **Documentación del API** disponible

---

## ✅ Integraciones Ya Realizadas por Backend

Durante las pruebas del backend, implementamos las siguientes integraciones en el frontend:

### 1. Sistema de Autenticación
**Archivos modificados:**
- `login.html` - Integrado con `POST /api/auth/login`
- `register.html` - Integrado con `POST /api/auth/register`
- `js/auth.js` - **CREADO** - Utilidad para manejo de JWT tokens
- `js/navbar.js` - **CREADO** - Actualización dinámica del navbar (login/logout)

**Funcionalidad:**
- Login funcional con validación
- Registro de usuarios con hash de contraseñas
- Tokens JWT guardados en localStorage
- Redirección automática en rutas protegidas
- Botón navbar cambia de "Iniciar sesión" a "Cerrar sesión"

### 2. Gestión de Habitaciones
**Archivos modificados:**
- `rooms.html` - Carga dinámica desde `GET /api/rooms`
- `addroom.html` - Integrado con `POST /api/rooms`

**Funcionalidad:**
- Lista habitaciones del usuario autenticado
- Creación de nuevas habitaciones
- Navegación con roomId y roomname

### 3. Gestión de Dispositivos
**Archivos modificados:**
- `devices.html` - Carga dinámica desde `GET /api/devices?habitacion={roomId}`
- `adddevice.html` - Integrado con `POST /api/devices` y `POST /api/cameras`
- `deviceinfo.html` - Control de dispositivos y visualización de datos

**Funcionalidad:**
- Lista dispositivos filtrados por habitación
- Muestra estado (Encendido/Apagado)
- Creación de dispositivos con detección inteligente de tipo
- **Cámaras se envían a colección separada** automáticamente
- Control de encendido/apagado
- Visualización de datos históricos con Chart.js

### 4. Sistema de Seguridad (Cámaras)
**Archivos modificados:**
- `security.html` - Integrado con `GET /api/cameras`

**Funcionalidad:**
- Lista cámaras del usuario
- Muestra "NO SIGNAL" cuando `camera.estado.conectada === false`
- Muestra información de streaming cuando está conectada
- Auto-refresh cada 5 segundos
- Controles de activar/grabar

### 5. Páginas de Tareas (NUEVO - Agregado hoy)
**Archivos modificados:**
- `addtask.html` - Carga dispositivos dinámicamente, pre-selecciona si viene desde deviceinfo
- `newtask.html` - Carga todos los dispositivos del usuario

**Funcionalidad:**
- Dropdown de dispositivos se carga desde el API
- Si se accede desde un dispositivo específico, ese dispositivo viene pre-seleccionado
- Variable `selectedDeviceId` disponible para crear la tarea

---

## ⚠️ Funcionalidades Faltantes (Responsabilidad de Frontend)

### 1. Completar Páginas de Tareas

**Archivos que necesitan trabajo:**
- `addtask.html` - Falta implementar el botón "Guardar" que cree la tarea
- `newtask.html` - Falta implementar el botón "Guardar" que cree la tarea
- `taskdata.html` - **Sin integrar** - Probablemente para ver datos de una tarea
- `taskinfo.html` - **Sin integrar** - Información detallada de tarea

**Endpoint a usar:**
```javascript
POST /api/tasks
Body: {
    nombre: "Nombre de la tarea",
    descripcion: "Descripción opcional",
    tipo: "manual", // o "programada"
    acciones: [
        {
            dispositivo: selectedDeviceId,
            accion: "encender", // o "apagar", etc.
            parametros: {
                // Parámetros específicos según el tipo de dispositivo
            }
        }
    ],
    horario: {
        // Solo si tipo === "programada"
        dias: ["lunes", "martes"],
        hora: "08:00"
    }
}
```

**Consultar:** `database/README.md` sección de Tasks para ver estructura completa del modelo.

### 2. Completar Página de Automatizaciones

**Archivo:**
- `automatize.html` - Actualmente solo tiene un botón "+" que lleva a `newtask.html`

**Falta implementar:**
- Listar automatizaciones existentes del usuario
- Mostrar estado (activa/inactiva)
- Permitir activar/desactivar con toggle
- Botones de editar/eliminar
- Crear nuevas automatizaciones (formulario complejo)

**Endpoints disponibles:**
```javascript
GET /api/automatize           // Listar todas
POST /api/automatize          // Crear nueva
PUT /api/automatize/:id/toggle // Activar/desactivar
DELETE /api/automatize/:id    // Eliminar
```

**Estructura de automatización:**
```javascript
{
    nombre: "Encender luces al atardecer",
    descripcion: "...",
    trigger: {
        tipo: "tiempo" | "sensor" | "dispositivoEstado",
        // Configuración según el tipo
    },
    condiciones: [/* condiciones opcionales */],
    acciones: [/* acciones a ejecutar */]
}
```

### 3. Funcionalidad de Editar/Eliminar

**Falta en:**
- `rooms.html` - Botones para editar/eliminar habitaciones
- `devices.html` - Botones para editar/eliminar dispositivos
- `security.html` - Botones para editar/eliminar cámaras
- Todas las páginas de tasks/automatizaciones

**Endpoints disponibles:**
```javascript
// Habitaciones
PUT /api/rooms/:id
DELETE /api/rooms/:id

// Dispositivos
PUT /api/devices/:id
DELETE /api/devices/:id

// Cámaras
PUT /api/cameras/:id
DELETE /api/cameras/:id

// Tareas
PUT /api/tasks/:id
DELETE /api/tasks/:id

// Automatizaciones
PUT /api/automatize/:id
DELETE /api/automatize/:id
```

**Recomendación:** Agregar un menú de 3 puntos (⋮) en cada tarjeta con opciones "Editar" y "Eliminar".

### 4. Validaciones y UX

**Agregar:**
- ✅ Loading states mientras se cargan datos del API
- ✅ Mensajes de error/éxito más descriptivos
- ✅ Confirmaciones antes de eliminar (modal de Bootstrap)
- ✅ Validaciones de formularios antes de enviar
- ✅ Manejo de errores del API (mostrar mensaje al usuario)

**Ejemplo de confirmación antes de eliminar:**
```javascript
async function deleteRoom(roomId, roomName) {
    if (confirm(`¿Estás seguro de eliminar la habitación "${roomName}"?`)) {
        try {
            const response = await fetchWithAuth(`${API_URL}/rooms/${roomId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Habitación eliminada exitosamente');
                location.reload();
            } else {
                alert('Error al eliminar la habitación');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    }
}
```

---

## 🐛 Problemas Detectados que Necesitan Corrección

### 1. ⚠️ Botón "Crear Cuenta" en login.html

**Ubicación:** `login.html` línea ~160

**Problema:** El botón principal del formulario de login dice "Crear Cuenta" en lugar de "Iniciar sesión"

**Impacto:** Confusión para el usuario - el botón funciona correctamente (hace login), pero el texto es incorrecto

**Solución sugerida:**
```html
<!-- Cambiar de: -->
<button type="submit" class="btn btn-primary">Crear Cuenta</button>

<!-- A: -->
<button type="submit" class="btn btn-primary">Iniciar sesión</button>
```

### 2. ⚠️ Navegación entre páginas usa nombres en lugar de IDs

**Problema:** Algunas páginas pasan `roomname` y `devicename` en la URL en lugar de `roomId` y `deviceId`

**Impacto:** Dificulta hacer llamadas al API que requieren IDs

**Solución:** Ya corregimos esto en `addtask.html`, pero deben revisar:
- `devices.html` - Asegurarse de pasar `roomId` y `deviceId` al navegar
- `deviceinfo.html` - Ya corregido
- Cualquier otra página que navegue entre secciones

### 3. ⚠️ Inconsistencia en parámetros URL

**Problema:** Algunas páginas usan `?param1=value?param2=value` (doble `?`) en lugar de `?param1=value&param2=value`

**Ejemplo en `addtask.html` línea 242:**
```javascript
// INCORRECTO:
window.location.href = "deviceinfo.html?roomname="+roomname+"?devicename="+devicename;

// CORRECTO:
window.location.href = "deviceinfo.html?roomname="+roomname+"&devicename="+devicename;
```

**Solución:** Buscar y reemplazar todos los casos de doble `?` por `&`.

---

## 📚 Documentación del API Disponible

### Documentación Principal
📄 **`database/README.md`** - Documentación completa del API con:
- Todos los endpoints disponibles
- Estructura de datos de cada modelo
- Ejemplos de requests/responses
- Códigos de error

### Documentación del Estado del Proyecto
📄 **`database/BACKEND_COMPLETADO.md`** - Resumen del backend:
- Estado de completación
- Endpoints agrupados por módulo
- Características implementadas
- Próximos pasos

### Análisis del Proyecto
📄 **`ANALISIS_PROYECTO.md`** - Análisis completo creado anteriormente

---

## 🔑 Información Importante

### Autenticación

**Todas las rutas del API (excepto `/api/auth/login` y `/api/auth/register`) requieren autenticación JWT.**

La utilidad `js/auth.js` ya provee las funciones necesarias:

```javascript
// Verificar si usuario está autenticado
if (!isAuthenticated()) {
    window.location.href = 'login.html';
}

// Hacer request con autenticación
const response = await fetchWithAuth('/api/rooms', {
    method: 'GET'
});

// Obtener token (si necesitas acceso directo)
const token = getToken();

// Cerrar sesión
removeToken();
window.location.href = 'login.html';
```

### Estructura de Respuestas del API

**Todas las respuestas siguen este formato:**

```javascript
// Éxito
{
    success: true,
    data: { /* objeto o array */ },
    count: 10 // solo en listados
}

// Error
{
    success: false,
    message: "Descripción del error",
    error: "Detalles técnicos" // solo en development
}
```

### Variables de Entorno

El servidor backend corre en:
```
http://localhost:3000
```

Todas las integraciones frontend usan:
```javascript
const API_URL = 'http://localhost:3000/api';
```

---

## 🎯 Prioridades Sugeridas

Sugerimos completar el frontend en este orden:

### Alta Prioridad
1. ✅ **Corregir texto del botón en `login.html`** (5 minutos)
2. ✅ **Agregar funcionalidad de editar/eliminar habitaciones** (2 horas)
3. ✅ **Agregar funcionalidad de editar/eliminar dispositivos** (2 horas)
4. ✅ **Completar creación de tareas en `addtask.html` y `newtask.html`** (4 horas)

### Media Prioridad
5. ✅ **Implementar listado de automatizaciones en `automatize.html`** (3 horas)
6. ✅ **Crear formulario de nueva automatización** (5 horas)
7. ✅ **Agregar confirmaciones antes de eliminar** (2 horas)

### Baja Prioridad
8. ✅ **Mejorar mensajes de error/éxito** (2 horas)
9. ✅ **Agregar loading states** (2 horas)
10. ✅ **Optimizar UX en general** (variable)

**Tiempo total estimado:** ~22-24 horas de trabajo

---

## 🤝 Integración Backend-Frontend

### Archivos Creados por Backend (que Frontend debe usar)

1. **`js/auth.js`** ⭐ MUY IMPORTANTE
   - Manejo completo de autenticación
   - Funciones: `saveToken()`, `getToken()`, `removeToken()`, `isAuthenticated()`, `fetchWithAuth()`, `requireAuth()`
   - **Debe incluirse en todas las páginas protegidas**

2. **`js/navbar.js`**
   - Actualiza el botón del navbar según estado de autenticación
   - **Debe incluirse en todas las páginas**

### Cómo Agregar en Páginas Nuevas

```html
<!-- Al final del body, antes de cerrar </body> -->
<script src="js/auth.js"></script>
<script src="js/navbar.js"></script>

<script>
    // Proteger la página (redirige a login si no está autenticado)
    requireAuth();

    // Tu código aquí
    const API_URL = 'http://localhost:3000/api';

    async function cargarDatos() {
        const response = await fetchWithAuth(`${API_URL}/tu-endpoint`);
        const data = await response.json();

        if (data.success) {
            // Procesar datos
        }
    }
</script>
```

---

## 📝 Ejemplos Prácticos

### Ejemplo 1: Eliminar Habitación

```javascript
async function deleteRoom(roomId) {
    if (!confirm('¿Estás seguro de eliminar esta habitación?')) {
        return;
    }

    try {
        const response = await fetchWithAuth(`${API_URL}/rooms/${roomId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            alert('Habitación eliminada exitosamente');
            location.reload(); // Recargar lista
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    }
}
```

### Ejemplo 2: Crear Tarea

```javascript
async function createTask() {
    const taskName = document.getElementById('user-input').value;

    if (!taskName || !selectedDeviceId) {
        alert('Por favor completa todos los campos');
        return;
    }

    const taskData = {
        nombre: taskName,
        tipo: 'manual',
        acciones: [
            {
                dispositivo: selectedDeviceId,
                accion: 'encender', // o el valor seleccionado
                parametros: {}
            }
        ]
    };

    try {
        const response = await fetchWithAuth(`${API_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (data.success) {
            alert('Tarea creada exitosamente');
            window.location.href = 'automatize.html';
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
    }
}
```

### Ejemplo 3: Toggle de Automatización

```javascript
async function toggleAutomatization(autoId) {
    try {
        const response = await fetchWithAuth(`${API_URL}/automatize/${autoId}/toggle`, {
            method: 'PUT'
        });

        const data = await response.json();

        if (data.success) {
            // Actualizar UI sin recargar
            const statusElement = document.getElementById(`status-${autoId}`);
            statusElement.textContent = data.data.activa ? 'Activa' : 'Inactiva';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 🆘 Soporte y Preguntas

### Para consultas sobre el backend:

1. **Revisar primero:** `database/README.md`
2. **Revisar código:** Todos los controladores tienen comentarios explicativos
3. **Probar endpoints:** Usar Thunder Client, Postman, o curl

### Contacto

Si tienen dudas sobre:
- Estructura de datos de algún modelo
- Cómo usar algún endpoint específico
- Errores del API

Pueden consultar directamente el código fuente en:
- `database/models/` - Esquemas de datos
- `database/controllers/` - Lógica de endpoints
- `database/routes/` - Definición de rutas

---

## ✅ Checklist para Frontend

Usen este checklist para trackear el progreso:

### Correcciones Urgentes
- [ ] Cambiar texto del botón en `login.html` (línea ~160)
- [ ] Revisar y corregir navegación con `?` doble

### Habitaciones
- [x] Listar habitaciones - ✅ Ya integrado
- [x] Crear habitación - ✅ Ya integrado
- [ ] Editar habitación
- [ ] Eliminar habitación (con confirmación)

### Dispositivos
- [x] Listar dispositivos - ✅ Ya integrado
- [x] Crear dispositivo - ✅ Ya integrado
- [x] Control de encendido/apagado - ✅ Ya integrado
- [ ] Editar dispositivo
- [ ] Eliminar dispositivo (con confirmación)

### Cámaras
- [x] Listar cámaras - ✅ Ya integrado
- [x] Crear cámara - ✅ Ya integrado (desde adddevice.html)
- [x] Mostrar estado/streaming - ✅ Ya integrado
- [ ] Editar cámara
- [ ] Eliminar cámara (con confirmación)

### Tareas
- [x] Cargar dispositivos en dropdown - ✅ Ya integrado (addtask.html, newtask.html)
- [ ] Implementar creación de tarea
- [ ] Listar tareas del usuario
- [ ] Editar tarea
- [ ] Eliminar tarea
- [ ] Ejecutar tarea manualmente
- [ ] Activar/desactivar tarea

### Automatizaciones
- [ ] Listar automatizaciones
- [ ] Crear automatización (formulario complejo)
- [ ] Editar automatización
- [ ] Eliminar automatización
- [ ] Activar/desactivar automatización
- [ ] Ejecutar manualmente
- [ ] Ver historial de ejecuciones

### UX General
- [ ] Agregar loading states
- [ ] Mejorar mensajes de error/éxito
- [ ] Confirmaciones antes de eliminar
- [ ] Validaciones de formularios
- [ ] Manejo de errores de red

---

## 🎉 Conclusión

El backend está completamente listo y probado. Todas las funcionalidades core del sistema están disponibles via API.

El frontend tiene una base sólida con las integraciones de autenticación, habitaciones, dispositivos y cámaras ya funcionando. Lo que falta es principalmente:

1. Completar CRUD (editar/eliminar)
2. Integrar páginas de tareas y automatizaciones
3. Mejorar UX y validaciones

**¡El proyecto está muy avanzado! Solo falta ese último empujón para tenerlo 100% funcional!** 🚀

---

**Última actualización:** 25 de Octubre de 2025
**Preparado por:** Juan Luis KYROS 2.0

