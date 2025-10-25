const express = require('express');
const router = express.Router();

const {
    getAutomatizations,
    getAutomatization,
    createAutomatization,
    updateAutomatization,
    deleteAutomatization,
    toggleAutomatization,
    executeAutomatization,
    getHistory
} = require('../controllers/automatizeController');

const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas principales
router.route('/')
    .get(getAutomatizations)
    .post(createAutomatization);

router.route('/:id')
    .get(getAutomatization)
    .put(updateAutomatization)
    .delete(deleteAutomatization);

// Rutas de control
router.put('/:id/toggle', toggleAutomatization);
router.post('/:id/execute', executeAutomatization);
router.get('/:id/history', getHistory);

module.exports = router;
