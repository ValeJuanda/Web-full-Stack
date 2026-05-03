const db = require('../config/db');

const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Estudiante ORDER BY id_estudiante DESC');
    res.status(200).json({
      success: true,
      data: rows,
      message: 'Estudiantes obtenidos correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al listar estudiantes'
    });
  }
};

const obtener = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Estudiante WHERE id_estudiante = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Estudiante no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: rows[0],
      message: 'Estudiante obtenido correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al obtener estudiante'
    });
  }
};

const crear = async (req, res) => {
  const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = req.body;
  if (!nombre || !apellido || !dni) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Nombre, apellido y DNI son obligatorios'
    });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO Estudiante (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES (?,?,?,?,?,?,?,?)',
      [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono]
    );
    res.status(201).json({
      success: true,
      data: { id: result.insertId },
      message: 'Estudiante creado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al crear estudiante'
    });
  }
};

const actualizar = async (req, res) => {
  const { nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE Estudiante SET nombre=?, apellido=?, direccion=?, poblacion=?, dni=?, fecha_nac=?, id_postal=?, telefono=? WHERE id_estudiante=?',
      [nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Estudiante no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: null,
      message: 'Estudiante actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al actualizar estudiante'
    });
  }
};

const eliminar = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Estudiante WHERE id_estudiante = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Estudiante no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: null,
      message: 'Estudiante eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al eliminar estudiante'
    });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };