const { listarAulas, obtenerAula, crearAula, actualizarAula, eliminarAula } = require('../models/aulaModel');

// Trae todas las aulas
const listar = async (req, res) => {
    try {
        const data = await listarAulas();
        res.status(200).json({ success: true, data, message: 'Aulas obtenidas correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al listar aulas' });
    }
};

// Trae un aula por su id
const obtener = async (req, res) => {
    try {
        const aula = await obtenerAula(req.params.id);
        if (!aula) return res.status(404).json({ success: false, data: null, message: 'Aula no encontrada' });
        res.status(200).json({ success: true, data: aula, message: 'Aula obtenida correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al obtener aula' });
    }
};

// Crea una nueva aula
const crear = async (req, res) => {
    const { piso, num_pupitres } = req.body;
    if (!piso || !num_pupitres) return res.status(400).json({ success: false, data: null, message: 'Piso y número de pupitres son obligatorios' });
    try {
        const id = await crearAula(req.body);
        res.status(201).json({ success: true, data: { id }, message: 'Aula creada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al crear aula' });
    }
};

// Actualiza un aula por su id
const actualizar = async (req, res) => {
    try {
        const filas = await actualizarAula(req.params.id, req.body);
        if (filas === 0) return res.status(404).json({ success: false, data: null, message: 'Aula no encontrada' });
        res.status(200).json({ success: true, data: null, message: 'Aula actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Error al actualizar aula' });
    }
};

// Elimina un aula por su id
const eliminar = async (req, res) => {
    try {
        const filas = await eliminarAula(req.params.id);
        if (filas === 0) return res.status(404).json({ success: false, data: null, message: 'Aula no encontrada' });
        res.status(200).json({ success: true, data: null, message: 'Aula eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar aula:', error.message);
        res.status(500).json({ success: false, data: null, message: 'Error al eliminar aula' });
    }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };