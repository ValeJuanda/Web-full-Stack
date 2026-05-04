const db = require('../config/db');
const { listarMatriculas, obtenerMatricula, crearMatricula, actualizarMatricula, eliminarMatricula } = require('../models/matriculaModel');

const listar = async (req, res) => {
    try {
        const rows = await listarMatriculas();
        res.status(200).json({
            success: true,
            data: rows,
            message: 'Matrículas obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar matrículas' });
    }
};

const obtener = async (req, res) => {
    try {
        const matricula = await obtenerMatricula(req.params.id);
        if (!matricula) {
            return res.status(404).json({ success: false, data: null, message: 'Matrícula no encontrada' });
        }
        res.status(200).json({ success: true, data: matricula, message: 'Matrícula obtenida correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al obtener matrícula' });
    }
};

const crear = async (req, res) => {
    const { id_estudiante, id_asignatura, nota } = req.body;
    if (!id_estudiante || !id_asignatura) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'El estudiante y la asignatura son obligatorios'
        });
    }
    try {
        const id = await crearMatricula({ id_estudiante, id_asignatura, nota });
        res.status(201).json({ success: true, data: { id }, message: 'Matrícula creada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al crear matrícula' });
    }
};

const actualizar = async (req, res) => {
    const { id_estudiante, id_asignatura, nota } = req.body;
    try {
        const filas = await actualizarMatricula(req.params.id, { id_estudiante, id_asignatura, nota });
        if (filas === 0) {
            return res.status(404).json({ success: false, data: null, message: 'Matrícula no encontrada' });
        }
        res.status(200).json({ success: true, data: null, message: 'Matrícula actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al actualizar matrícula' });
    }
};

const eliminar = async (req, res) => {
    try {
        const filas = await eliminarMatricula(req.params.id);
        if (filas === 0) {
            return res.status(404).json({ success: false, data: null, message: 'Matrícula no encontrada' });
        }
        res.status(200).json({ success: true, data: null, message: 'Matrícula eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al eliminar matrícula' });
    }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };