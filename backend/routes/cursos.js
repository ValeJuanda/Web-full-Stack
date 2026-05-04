const express = require('express');
const router = express.Router();
const { listar } = require('../controllers/cursoController');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);

router.get('/', listar);

module.exports = router;