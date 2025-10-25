const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME || 'Kyros'
        });

        console.log(`[MongoDB] Conexión exitosa a ${conn.connection.db.databaseName}`);
        console.log(`[MongoDB] Host: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error('[MongoDB] ERROR DE CONEXIÓN:', error.message);
        console.error('Detalles:', error);
        console.error('Asegúrate de que:');
        console.error('1. La IP de tu red esté permitida en MongoDB Atlas');
        console.error('2. Las credenciales en .env sean correctas');
        console.error('3. El nombre de la base de datos sea correcto');

        // No salir del proceso en desarrollo para facilitar debugging
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        throw error;
    }
};

// Eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('[MongoDB] Mongoose conectado');
});

mongoose.connection.on('error', (err) => {
    console.error('[MongoDB] Error de conexión:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('[MongoDB] Mongoose desconectado');
});

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('[MongoDB] Conexión cerrada por terminación de aplicación');
    process.exit(0);
});

module.exports = connectDB;
