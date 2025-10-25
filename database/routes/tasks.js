const express = require('express');
const router = express.Router();

const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    executeTask
} = require('../controllers/taskController');

const { protect } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas principales
router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

// Rutas de control
router.put('/:id/toggle', toggleTask);
router.post('/:id/execute', executeTask);

module.exports = router;
