const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese un nombre para la tarea'],
        trim: true
    },
    descripcion: {
        type: String,
        trim: true,
        default: ''
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'La tarea debe pertenecer a un usuario']
    },
    // Tipo de tarea
    tipo: {
        type: String,
        enum: ['manual', 'programada', 'evento'],
        default: 'manual'
    },
    // Estado de la tarea
    estado: {
        type: String,
        enum: ['pendiente', 'en_progreso', 'completada', 'cancelada', 'fallida'],
        default: 'pendiente'
    },
    activa: {
        type: Boolean,
        default: true
    },
    // Programación (para tareas programadas)
    programacion: {
        tipo: {
            type: String,
            enum: ['una_vez', 'diaria', 'semanal', 'mensual', 'personalizada'],
            default: 'una_vez'
        },
        fechaHora: {
            type: Date
        },
        diasSemana: [{
            type: Number,
            min: 0,
            max: 6 // 0 = Domingo, 6 = Sábado
        }],
        hora: {
            type: String, // Formato HH:MM
            default: '00:00'
        },
        cronExpression: {
            type: String // Para programaciones personalizadas
        }
    },
    // Acciones a realizar
    acciones: [{
        dispositivo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        },
        accion: {
            type: String,
            required: true,
            enum: ['encender', 'apagar', 'toggle', 'ajustar', 'notificar']
        },
        parametros: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        orden: {
            type: Number,
            default: 0
        }
    }],
    // Condiciones (para tareas basadas en eventos)
    condiciones: [{
        tipo: {
            type: String,
            enum: ['temperatura', 'humedad', 'movimiento', 'hora', 'estado_dispositivo', 'otro']
        },
        operador: {
            type: String,
            enum: ['igual', 'diferente', 'mayor', 'menor', 'mayor_igual', 'menor_igual']
        },
        valor: {
            type: mongoose.Schema.Types.Mixed
        },
        dispositivo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        }
    }],
    // Ejecuciones
    ultimaEjecucion: {
        type: Date
    },
    proximaEjecucion: {
        type: Date
    },
    totalEjecuciones: {
        type: Number,
        default: 0
    },
    // Notificaciones
    notificaciones: {
        alIniciar: {
            type: Boolean,
            default: false
        },
        alCompletar: {
            type: Boolean,
            default: false
        },
        alFallar: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

// Índices
TaskSchema.index({ usuario: 1, activa: 1 });
TaskSchema.index({ estado: 1, proximaEjecucion: 1 });

module.exports = mongoose.model('Task', TaskSchema, 'tasks');
