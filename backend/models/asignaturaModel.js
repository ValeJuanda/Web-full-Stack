const db = require('../config/db');

// Trae todas las asignaturas con nombre del profesor y curso usando JOIN
const listarAsignaturas = async () => {
    const [rows] = await db.query(`
        SELECT a.*, 
               CONCAT(p.nombre, ' ', p.apellido) as nombre_profesor,
               c.nombre as nombre_curso
        FROM Asignaturas a
        LEFT JOIN Profesor p ON a.id_profesor = p.id_profesor
        LEFT JOIN Curso c ON a.id_curso = c.id_curso
        ORDER BY a.id_asignatura DESC
    `);
    return rows;
};

// Trae una asignatura por su id
const obtenerAsignatura = async (id) => {
    const [rows] = await db.query('SELECT * FROM Asignaturas WHERE id_asignatura = ?', [Number(id)]);
    return rows[0] || null;
};

// Crea una nueva asignatura
const crearAsignatura = async ({ nombre, horas_semana, id_profesor, id_curso }) => {
    const [result] = await db.query(
        'INSERT INTO Asignaturas (nombre, horas_semana, id_profesor, id_curso) VALUES (?,?,?,?)',
        [nombre, horas_semana, id_profesor || null, id_curso || null]
    );
    return result.insertId;
};

// Actualiza una asignatura por su id
const actualizarAsignatura = async (id, { nombre, horas_semana, id_profesor, id_curso }) => {
    const [result] = await db.query(
        'UPDATE Asignaturas SET nombre=?, horas_semana=?, id_profesor=?, id_curso=? WHERE id_asignatura=?',
        [nombre, horas_semana, id_profesor || null, id_curso || null, Number(id)]
    );
    return result.affectedRows;
};

// Elimina una asignatura por su id
// Las matrículas e imparte_aula se eliminan automáticamente por ON DELETE CASCADE
const eliminarAsignatura = async (id) => {
    const [result] = await db.query('DELETE FROM Asignaturas WHERE id_asignatura = ?', [Number(id)]);
    return result.affectedRows;
};

module.exports = { listarAsignaturas, obtenerAsignatura, crearAsignatura, actualizarAsignatura, eliminarAsignatura };