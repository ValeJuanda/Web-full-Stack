const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);

// Listar todos los profesores
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Profesor ORDER BY id_profesor DESC');
        res.status(200).json({ success: true, data: rows, message: 'Profesores obtenidos correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar profesores' });
    }
});

module.exports = router;