const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);

// Listar todos los cursos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Curso ORDER BY id_curso DESC');
        res.status(200).json({ success: true, data: rows, message: 'Cursos obtenidos correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar cursos' });
    }
});

module.exports = router;