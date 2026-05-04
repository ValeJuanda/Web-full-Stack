const db = require('../config/db');

// Obtener todos los profesores
const listarProfesores = async () => {
    const [rows] = await db.query('SELECT * FROM Profesor ORDER BY id_profesor DESC');
    return rows;
};

// Obtener un profesor por id
const obtenerProfesor = async (id) => {
    const [rows] = await db.query('SELECT * FROM Profesor WHERE id_profesor = ?', [id]);
    return rows[0] || null;
};

// Crear un nuevo profesor
const crearProfesor = async ({ nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono }) => {
    const [result] = await db.query(
        'INSERT INTO Profesor (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES (?,?,?,?,?,?,?,?)',
        [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono]
    );
    return result.insertId;
};

// Actualizar un profesor
const actualizarProfesor = async (id, { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono }) => {
    const [result] = await db.query(
        'UPDATE Profesor SET nombre=?, apellido=?, direccion=?, poblacion=?, dni=?, fecha_nac=?, id_postal=?, telefono=? WHERE id_profesor=?',
        [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono, id]
    );
    return result.affectedRows;
};

// Eliminar un profesor
const eliminarProfesor = async (id) => {
    const [result] = await db.query('DELETE FROM Profesor WHERE id_profesor = ?', [id]);
    return result.affectedRows;
};

module.exports = { listarProfesores, obtenerProfesor, crearProfesor, actualizarProfesor, eliminarProfesor };