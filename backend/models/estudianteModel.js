const db = require('../config/db');

// Trae todos los estudiantes ordenados del más reciente al más antiguo
const obtenerTodos = async () => {
    const [rows] = await db.query('SELECT * FROM Estudiante ORDER BY id_estudiante DESC');
    return rows;
};

// Trae un estudiante por su id
const obtenerPorId = async (id) => {
    const [rows] = await db.query('SELECT * FROM Estudiante WHERE id_estudiante = ?', [id]);
    return rows[0] || null;
};

// Crea un nuevo estudiante
const crear = async (datos) => {
    const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = datos;
    const [result] = await db.query(
        'INSERT INTO Estudiante (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES (?,?,?,?,?,?,?,?)',
        [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono]
    );
    return result;
};

// Actualiza un estudiante por su id
const actualizar = async (id, datos) => {
    const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = datos;
    const [result] = await db.query(
        'UPDATE Estudiante SET nombre=?, apellido=?, direccion=?, poblacion=?, dni=?, fecha_nac=?, id_postal=?, telefono=? WHERE id_estudiante=?',
        [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono, id]
    );
    return result;
};

// Elimina un estudiante por su id
// Las matrículas se eliminan automáticamente por ON DELETE CASCADE
const eliminar = async (id) => {
    const [result] = await db.query('DELETE FROM Estudiante WHERE id_estudiante = ?', [id]);
    return result;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };