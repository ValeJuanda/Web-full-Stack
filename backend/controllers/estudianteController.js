const {
  listarEstudiantes,
  obtenerEstudiante,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante
} = require('../models/estudianteModel');

const listar = async (req, res) => {
  try {
    const data = await listarEstudiantes();
    res.status(200).json({ success: true, data, message: 'Estudiantes obtenidos correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Error al listar estudiantes' });
  }
};

const obtener = async (req, res) => {
  try {
    const estudiante = await obtenerEstudiante(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ success: false, data: null, message: 'Estudiante no encontrado' });
    }
    res.status(200).json({ success: true, data: estudiante, message: 'Estudiante obtenido correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Error al obtener estudiante' });
  }
};

const crear = async (req, res) => {
  const { nombre, apellido, dni } = req.body;
  if (!nombre || !apellido || !dni) {
    return res.status(400).json({ success: false, data: null, message: 'Nombre, apellido y DNI son obligatorios' });
  }
  try {
    const id = await crearEstudiante(req.body);
    res.status(201).json({ success: true, data: { id }, message: 'Estudiante creado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Error al crear estudiante' });
  }
};

const actualizar = async (req, res) => {
  try {
    const filas = await actualizarEstudiante(req.params.id, req.body);
    if (filas === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Estudiante no encontrado' });
    }
    res.status(200).json({ success: true, data: null, message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Error al actualizar estudiante' });
  }
};

const eliminar = async (req, res) => {
  try {
    const filas = await eliminarEstudiante(req.params.id);
    if (filas === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Estudiante no encontrado' });
    }
    res.status(200).json({ success: true, data: null, message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Error al eliminar estudiante' });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };