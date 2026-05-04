const db = require('../config/db');

// Trae todas las aulas ordenadas por id
const listarAulas = async () => {
    const [rows] = await db.query('SELECT * FROM Aula ORDER BY id_aula DESC');
    return rows;
};

// Trae un aula por su id
const obtenerAula = async (id) => {
    const [rows] = await db.query('SELECT * FROM Aula WHERE id_aula = ?', [Number(id)]);
    return rows[0] || null;
};

// Crea un nueva aula
const crearAula = async ({ piso, num_pupitres }) => {
    const [result] = await db.query(
        'INSERT INTO Aula (piso, num_pupitres) VALUES (?,?)',
        [piso, num_pupitres]
    );
    return result.insertId;
};

// Actualiza un aula por su id
const actualizarAula = async (id, { piso, num_pupitres }) => {
    const [result] = await db.query(
        'UPDATE Aula SET piso=?, num_pupitres=? WHERE id_aula=?',
        [piso, num_pupitres, Number(id)]
    );
    return result.affectedRows;
};

// Elimina un aula por su id
const eliminarAula = async (id) => {
    const [result] = await db.query('DELETE FROM Aula WHERE id_aula = ?', [Number(id)]);
    return result.affectedRows;
};

module.exports = { listarAulas, obtenerAula, crearAula, actualizarAula, eliminarAula };