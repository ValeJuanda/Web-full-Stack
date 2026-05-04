const {
    listarAsignaturas,
    obtenerAsignatura,
    crearAsignatura,
    actualizarAsignatura,
    eliminarAsignatura
} = require('../models/asignaturaModel');

// GET /asignaturas
const listar = async (req, res) => {
    try {
        const data = await listarAsignaturas();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al listar' });
    }
};

// GET /asignaturas/:id
const obtener = async (req, res) => {
    try {
        const data = await obtenerAsignatura(req.params.id);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

// POST
const crear = async (req, res) => {
    try {
        const id = await crearAsignatura(req.body);
        res.json({ success: true, data: { id } });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

// PUT
const actualizar = async (req, res) => {
    try {
        await actualizarAsignatura(req.params.id, req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

// DELETE
const eliminar = async (req, res) => {
    try {
        await eliminarAsignatura(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };