const express = require('express');
const router = express.Router();

const {
    getCameras,
    getCamera,
    createCamera,
    updateCamera,
    deleteCamera,
    toggleCamera,
    toggleRecording,
    updateConnectionStatus
} = require('../controllers/cameraController');

const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas principales
router.route('/')
    .get(getCameras)
    .post(createCamera);

router.route('/:id')
    .get(getCamera)
    .put(updateCamera)
    .delete(deleteCamera);

// Rutas de control
router.put('/:id/toggle', toggleCamera);
router.put('/:id/recording', toggleRecording);
router.put('/:id/status', updateConnectionStatus);

module.exports = router;
