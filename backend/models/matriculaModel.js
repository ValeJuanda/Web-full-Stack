const db = require('../config/db');

// Trae todas las matrículas con nombre del estudiante y nombre de la asignatura
const listarMatriculas = async () => {
    const [rows] = await db.query(`
        SELECT m.*,
            CONCAT(e.nombre, ' ', e.apellido) AS nombre_estudiante,
            a.nombre AS nombre_asignatura
        FROM Matricula m
        LEFT JOIN Estudiante e ON m.id_estudiante = e.id_estudiante
        LEFT JOIN Asignaturas a ON m.id_asignatura = a.id_asignatura
        ORDER BY m.id_matricula DESC
    `);
    return rows;
};

// Trae una matrícula por su id
const obtenerMatricula = async (id) => {
    const [rows] = await db.query('SELECT * FROM Matricula WHERE id_matricula = ?', [Number(id)]);
    return rows[0] || null;
};

// Crea una nueva matrícula y devuelve el id generado
const crearMatricula = async ({ id_estudiante, id_asignatura, nota }) => {
    const [result] = await db.query(
        'INSERT INTO Matricula (id_estudiante, id_asignatura, nota) VALUES (?,?,?)',
        [id_estudiante, id_asignatura, nota || null]
    );
    return result.insertId;
};

// Actualiza una matrícula y devuelve cuántas filas fueron afectadas
const actualizarMatricula = async (id, { id_estudiante, id_asignatura, nota }) => {
    const [result] = await db.query(
        'UPDATE Matricula SET id_estudiante=?, id_asignatura=?, nota=? WHERE id_matricula=?',
        [id_estudiante, id_asignatura, nota || null, Number(id)]
    );
    return result.affectedRows;
};

// Elimina una matrícula y devuelve cuántas filas fueron afectadas
const eliminarMatricula = async (id) => {
    const [result] = await db.query('DELETE FROM Matricula WHERE id_matricula = ?', [Number(id)]);
    return result.affectedRows;
};

module.exports = { listarMatriculas, obtenerMatricula, crearMatricula, actualizarMatricula, eliminarMatricula };