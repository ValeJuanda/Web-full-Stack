const db = require('../config/db');

// Busca un usuario por su nombre de usuario
const buscarPorUsuario = async (usuario) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return rows[0] || null;
};

// Crea un nuevo usuario en la BD
const crearUsuario = async (usuario, hash, rol) => {
    const [result] = await db.query(
        'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
        [usuario, hash, rol]
    );
    return result;
};

module.exports = { buscarPorUsuario, crearUsuario };