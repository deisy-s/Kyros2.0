const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');

// Middleware para proteger rutas que requieren autenticación
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Obtener token del header Authorization: Bearer <token>
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Verificar que el token existe
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado. Token no proporcionado'
            });
        }

        try {
            // Verificar token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Agregar usuario a la request
            req.user = await Usuario.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido o expirado'
            });
        }
    } catch (error) {
        next(error);
    }
};

// Middleware para autorizar roles específicos
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.tipo)) {
            return res.status(403).json({
                success: false,
                message: `El rol ${req.user.tipo} no está autorizado para acceder a este recurso`
            });
        }
        next();
    };
};
