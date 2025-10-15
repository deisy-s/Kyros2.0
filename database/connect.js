const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');

const DB_URL = "mongodb+srv://proyecto_db_user:24F37BSGlwmpJseO@cluster0.bnw02pb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3000;

const app = express();

app.use(cors()); 
app.use(express.json());

mongoose.connect(DB_URL)
    .then(() => console.log('[MongoDB] Conexión exitosa a TecBusInfo. Servidor iniciado en puerto ${PORT})'))
    .catch(err => {
        console.error("[MongoDB] ERROR DE CONEXIÓN:", err.message);
        console.error("Asegúrate de que la IP de tu red esté permitida en MongoDB Atlas.");
    });

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    tipo: { type: String, default: 'estudiante' }, 
    fechaRegistro: { type: Date, default: Date.now },
    estado: { type: String, default: 'activo' },
    assignedBus: { type: String, default: null }, 
    
    estudiante: {
        matricula: { type: String, default: '' },
        rutaPreferida: { type: String, default: '' },
        searchHistory: { type: Number, default: 0 }
    }
}, { collection: 'kyros' }); 
const Usuario = mongoose.model('Usuario', UserSchema);

// 1. REGISTRO 
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }
    try {
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'El correo electrónico ya está registrado.' });
        }
        const newUser = new Usuario({ nombre: name, email: email, password: password, tipo: 'estudiante' });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Registro exitoso. Ahora inicia sesión.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor al registrar.' });
    }
});


// 2. LOGIN 
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Usuario.findOne({ email: email, password: password });
        
        if (user) {
            const userData = {
                id: user._id,
                name: user.nombre,
                email: user.email,
                role: user.tipo, 
                assignedBus: user.assignedBus, 
                searchHistory: user.estudiante ? user.estudiante.searchHistory : 0 
            };
            return res.json({ success: true, user: userData });
        } else {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas (correo o contraseña incorrectos).' });
        }
    } catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

const frontendDir = path.join(__dirname, '..'); 
app.use(serveStatic(frontendDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendDir, 'responsive.html')); 
});

app.listen(PORT, () => {
    console.log('[Express] Servidor escuchando en http://localhost:${PORT}');
});