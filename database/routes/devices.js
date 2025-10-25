const express = require('express');
const {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    toggleDevice,
    getDeviceData
} = require('../controllers/deviceController');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
    .get(getDevices)
    .post(createDevice);

router.route('/:id')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice);

router.route('/:id/toggle')
    .put(toggleDevice);

router.route('/:id/data')
    .get(getDeviceData);

module.exports = router;
