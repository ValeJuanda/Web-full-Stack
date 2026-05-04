const { listarCursos, obtenerCurso, crearCurso, actualizarCurso, eliminarCurso } = require('../models/cursoModel');

// Trae todos los cursos
const listar = async (req, res) => {
    try {
        const data = await listarCursos();
        res.status(200).json({ success: true, data, message: 'Cursos obtenidos correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar cursos' });
    }
};

// Trae un curso por su id
const obtener = async (req, res) => {
    try {
        const curso = await obtenerCurso(req.params.id);
        if (!curso) return res.status(404).json({ success: false, data: null, message: 'Curso no encontrado' });
        res.status(200).json({ success: true, data: curso, message: 'Curso obtenido correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al obtener curso' });
    }
};

// Crea un nuevo curso
const crear = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ success: false, data: null, message: 'El nombre es obligatorio' });
    try {
        const id = await crearCurso(req.body);
        res.status(201).json({ success: true, data: { id }, message: 'Curso creado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al crear curso' });
    }
};

// Actualiza un curso por su id
const actualizar = async (req, res) => {
    try {
        const filas = await actualizarCurso(req.params.id, req.body);
        if (filas === 0) return res.status(404).json({ success: false, data: null, message: 'Curso no encontrado' });
        res.status(200).json({ success: true, data: null, message: 'Curso actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al actualizar curso' });
    }
};

// Elimina un curso por su id
const eliminar = async (req, res) => {
    try {
        const filas = await eliminarCurso(req.params.id);
        if (filas === 0) return res.status(404).json({ success: false, data: null, message: 'Curso no encontrado' });
        res.status(200).json({ success: true, data: null, message: 'Curso eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar curso:', error.message);
        res.status(500).json({ success: false, data: null, message: 'Error al eliminar curso' });
    }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };