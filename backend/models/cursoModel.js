const db = require('../config/db');

// Trae todos los cursos con el nombre del profesor tutor usando JOIN
const listarCursos = async () => {
    const [rows] = await db.query(`
        SELECT c.*, CONCAT(p.nombre, ' ', p.apellido) as nombre_profesor
        FROM Curso c
        LEFT JOIN Profesor p ON c.id_profesor = p.id_profesor
        ORDER BY c.id_curso DESC
    `);
    return rows;
};

// Trae un curso por su id
const obtenerCurso = async (id) => {
    const [rows] = await db.query('SELECT * FROM Curso WHERE id_curso = ?', [Number(id)]);
    return rows[0] || null;
};

// Crea un nuevo curso
const crearCurso = async ({ nombre, id_profesor }) => {
    const [result] = await db.query(
        'INSERT INTO Curso (nombre, id_profesor) VALUES (?,?)',
        [nombre, id_profesor || null]
    );
    return result.insertId;
};

// Actualiza un curso por su id
const actualizarCurso = async (id, { nombre, id_profesor }) => {
    const [result] = await db.query(
        'UPDATE Curso SET nombre=?, id_profesor=? WHERE id_curso=?',
        [nombre, id_profesor || null, Number(id)]
    );
    return result.affectedRows;
};

// Elimina un curso por su id
const eliminarCurso = async (id) => {
    const [result] = await db.query('DELETE FROM Curso WHERE id_curso = ?', [Number(id)]);
    return result.affectedRows;
};

module.exports = { listarCursos, obtenerCurso, crearCurso, actualizarCurso, eliminarCurso };