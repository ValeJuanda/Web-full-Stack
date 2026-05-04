const {
    listarProfesores,
    obtenerProfesor,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
} = require('../models/profesorModel');

const listar = async (req, res) => {
    try {
        const data = await listarProfesores();
        res.status(200).json({ success: true, data, message: 'Profesores obtenidos correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar profesores' });
    }
};

const obtener = async (req, res) => {
    try {
        const profesor = await obtenerProfesor(req.params.id);
        if (!profesor) {
            return res.status(404).json({ success: false, data: null, message: 'Profesor no encontrado' });
        }
        res.status(200).json({ success: true, data: profesor, message: 'Profesor obtenido correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al obtener profesor' });
    }
};

const crear = async (req, res) => {
    const { nombre, apellido, dni } = req.body;
    if (!nombre || !apellido || !dni) {
        return res.status(400).json({ success: false, data: null, message: 'Nombre, apellido y DNI son obligatorios' });
    }
    try {
        const id = await crearProfesor(req.body);
        res.status(201).json({ success: true, data: { id }, message: 'Profesor creado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al crear profesor' });
    }
};

const actualizar = async (req, res) => {
    try {
        const filas = await actualizarProfesor(req.params.id, req.body);
        if (filas === 0) {
            return res.status(404).json({ success: false, data: null, message: 'Profesor no encontrado' });
        }
        res.status(200).json({ success: true, data: null, message: 'Profesor actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al actualizar profesor' });
    }
};

const eliminar = async (req, res) => {
    try {
        const filas = await eliminarProfesor(req.params.id);
        if (filas === 0) {
            return res.status(404).json({ success: false, data: null, message: 'Profesor no encontrado' });
        }
        res.status(200).json({ success: true, data: null, message: 'Profesor eliminado correctamente' });
    } catch (error) {
        // Muestra el error exacto en la terminal del backend
        console.error('Error al eliminar profesor:', error.message);
        res.status(500).json({ success: false, data: null, message: 'Error al eliminar profesor' });
    }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };