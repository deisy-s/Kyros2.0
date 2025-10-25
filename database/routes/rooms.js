const express = require('express');
const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomDevices
} = require('../controllers/roomController');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
    .get(getRooms)
    .post(createRoom);

router.route('/:id')
    .get(getRoom)
    .put(updateRoom)
    .delete(deleteRoom);

router.route('/:id/devices')
    .get(getRoomDevices);

module.exports = router;
