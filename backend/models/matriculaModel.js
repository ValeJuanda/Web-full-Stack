const db = require('../config/db');

// Listar matrículas (sin joins que no existen)
const listarMatriculas = async () => {
    const [rows] = await db.query(`
        SELECT * 
        FROM matricula
        ORDER BY id_estudiante DESC
    `);

    return rows;
};

// Obtener matrícula por id_estudiante (o puedes ajustar PK si tienes otro id)
const obtenerMatricula = async (id_estudiante) => {
    const [rows] = await db.query(
        `SELECT * FROM matricula WHERE id_estudiante = ?`,
        [Number(id_estudiante)]
    );

    return rows[0] || null;
};

// Crear matrícula
const crearMatricula = async ({ id_estudiante, id_asignatura, nota, incidencias }) => {
    const [result] = await db.query(
        `INSERT INTO matricula (id_estudiante, id_asignatura, nota, incidencias)
        VALUES (?, ?, ?, ?)`,
        [id_estudiante, id_asignatura, nota || null, incidencias || null]
    );

    return result.insertId;
};

// Actualizar matrícula
const actualizarMatricula = async (id_estudiante, { id_asignatura, nota, incidencias }) => {
    const [result] = await db.query(
        `UPDATE matricula
        SET id_asignatura = ?, nota = ?, incidencias = ?
        WHERE id_estudiante = ?`,
        [id_asignatura, nota || null, incidencias || null, Number(id_estudiante)]
    );

    return result.affectedRows;
};

// Eliminar matrícula
const eliminarMatricula = async (id_estudiante) => {
    const [result] = await db.query(
        `DELETE FROM matricula WHERE id_estudiante = ?`,
        [Number(id_estudiante)]
    );

    return result.affectedRows;
};

module.exports = {
    listarMatriculas,
    obtenerMatricula,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
};