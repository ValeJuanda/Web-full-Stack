const db = require('../config/db');

// Trae todos los estudiantes ordenados del más reciente al más antiguo
const listarEstudiantes = async () => {
    const [rows] = await db.query('SELECT * FROM Estudiante ORDER BY id_estudiante DESC');
    return rows;
};

// Trae un estudiante por su id
const obtenerEstudiante = async (id) => {
    const [rows] = await db.query('SELECT * FROM Estudiante WHERE id_estudiante = ?', [id]);
    return rows[0] || null;
};

// Crea un nuevo estudiante y devuelve el id generado
const crearEstudiante = async (datos) => {
    const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = datos;
    const [result] = await db.query(
        'INSERT INTO Estudiante (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES (?,?,?,?,?,?,?,?)',
        [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono]
    );
    return result.insertId;
};

// Actualiza un estudiante y devuelve cuántas filas fueron afectadas
const actualizarEstudiante = async (id, datos) => {
    const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = datos;
    const [result] = await db.query(
        'UPDATE Estudiante SET nombre=?, apellido=?, direccion=?, poblacion=?, dni=?, fecha_nac=?, id_postal=?, telefono=? WHERE id_estudiante=?',
        [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono, id]
    );
    return result.affectedRows;
};

// Elimina un estudiante y devuelve cuántas filas fueron afectadas
// Las matrículas se eliminan automáticamente por ON DELETE CASCADE
const eliminarEstudiante = async (id) => {
    const [result] = await db.query('DELETE FROM Estudiante WHERE id_estudiante = ?', [id]);
    return result.affectedRows;
};

module.exports = { listarEstudiantes, obtenerEstudiante, crearEstudiante, actualizarEstudiante, eliminarEstudiante };