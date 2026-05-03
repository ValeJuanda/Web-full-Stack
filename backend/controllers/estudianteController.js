const db = require('../config/db');

const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Estudiante ORDER BY id_estudiante DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar', error: error.message });
  }
};

const obtener = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Estudiante WHERE id_estudiante = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error: error.message });
  }
};

const crear = async (req, res) => {
  const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = req.body;
  if (!nombre || !apellido || !dni) return res.status(400).json({ mensaje: 'Nombre, apellido y DNI obligatorios' });
  try {
    const [result] = await db.query(
      'INSERT INTO Estudiante (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES (?,?,?,?,?,?,?,?)',
      [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono]
    );
    res.status(201).json({ mensaje: 'Estudiante creado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear', error: error.message });
  }
};

const actualizar = async (req, res) => {
  const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Estudiante SET nombre=?, apellido=?, direccion=?, poblacion=?, dni=?, fecha_nac=?, id_postal=?, telefono=? WHERE id_estudiante=?',
      [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json({ mensaje: 'Estudiante actualizado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Estudiante WHERE id_estudiante = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json({ mensaje: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };