const db = require('../config/db');

// Obtener todos los cursos
const listarCursos = async () => {
    const [rows] = await db.query('SELECT * FROM Curso ORDER BY id_curso DESC');
    return rows;
};

module.exports = { listarCursos }