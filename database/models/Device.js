const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese un nombre para el dispositivo'],
        trim: true
    },
    tipo: {
        type: String,
        required: [true, 'Por favor especifique el tipo de dispositivo'],
        enum: ['luz', 'termostato', 'cerradura', 'sensor', 'camara', 'enchufe', 'ventilador', 'otro']
    },
    marca: {
        type: String,
        trim: true,
        default: ''
    },
    modelo: {
        type: String,
        trim: true,
        default: ''
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'El dispositivo debe estar asignado a una habitación']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El dispositivo debe pertenecer a un usuario']
    },
    // Estado y configuración del dispositivo
    estado: {
        encendido: {
            type: Boolean,
            default: false
        },
        conectado: {
            type: Boolean,
            default: false
        },
        ultimaConexion: {
            type: Date,
            default: Date.now
        }
    },
    // Configuración específica según el tipo
    configuracion: {
        // Para luces
        brillo: {
            type: Number,
            min: 0,
            max: 100,
            default: 100
        },
        color: {
            type: String,
            default: '#FFFFFF'
        },
        // Para termostatos
        temperatura: {
            type: Number,
            default: 22
        },
        temperaturaObjetivo: {
            type: Number,
            default: 22
        },
        // Para sensores
        valorActual: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },
        // Configuración general
        notificacionesActivas: {
            type: Boolean,
            default: true
        }
    },
    // Información del hardware
    hardware: {
        mac: {
            type: String,
            default: ''
        },
        ip: {
            type: String,
            default: ''
        },
        firmware: {
            type: String,
            default: ''
        }
    }
}, {
    timestamps: true
});

// Índices para búsquedas rápidas
DeviceSchema.index({ usuario: 1, habitacion: 1 });
DeviceSchema.index({ tipo: 1 });

// Actualizar ultimaConexion al modificar el estado
DeviceSchema.pre('save', function(next) {
    if (this.isModified('estado.conectado') || this.isModified('estado.encendido')) {
        this.estado.ultimaConexion = Date.now();
    }
    next();
});

module.exports = mongoose.model('Device', DeviceSchema, 'devices');
