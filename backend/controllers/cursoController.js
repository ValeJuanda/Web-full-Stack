const { listarCursos } = require('../models/cursoModel');

const listar = async (req, res) => {
    try {
        const data = await listarCursos();
        res.status(200).json({ success: true, data, message: 'Cursos obtenidos correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar cursos' });
    }
};

module.exports = { listar };