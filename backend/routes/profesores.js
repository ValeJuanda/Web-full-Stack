const express = require('express');
const router = express.Router();
const { listar, obtener, crear, actualizar, eliminar } = require('../controllers/profesorController');
const { verificarToken, soloAdmin } = require('../middleware/auth');

// Todas las rutas requieren token JWT
router.use(verificarToken);

router.get('/', listar);
router.get('/:id', obtener);
// Solo admin y moderador pueden crear, actualizar y eliminar
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;