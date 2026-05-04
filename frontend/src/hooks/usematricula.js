import { useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

// Hook que encapsula toda la lógica de matrículas:
// carga, búsqueda, paginación, crear, editar y eliminar

const camposVacios = {
    id_estudiante: '', id_asignatura: '', nota: ''
};

const useMatriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [form, setForm] = useState(camposVacios);
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const porPagina = 5;

    // Carga la lista de matrículas desde el backend
    const cargarMatriculas = async () => {
        try {
            const res = await API.get('/matriculas');
            if (Array.isArray(res.data.data)) {
                setMatriculas(res.data.data);
            } else if (Array.isArray(res.data)) {
                setMatriculas(res.data);
            } else {
                setMatriculas([]);
            }
        } catch (error) {
            setMatriculas([]);
            Swal.fire({ icon: 'error', title: 'Error al cargar matrículas' });
        }
    };

    // Carga los estudiantes para el selector del formulario
    const cargarEstudiantes = async () => {
        try {
            const res = await API.get('/estudiantes');
            setEstudiantes(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            setEstudiantes([]);
        }
    };

    // Carga las asignaturas para el selector del formulario
    const cargarAsignaturas = async () => {
        try {
            const res = await API.get('/asignaturas');
            setAsignaturas(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            setAsignaturas([]);
        }
    };

    useEffect(() => {
        cargarMatriculas();
        cargarEstudiantes();
        cargarAsignaturas();
    }, []);

    // Actualiza el estado del formulario al cambiar cualquier input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envía el formulario para crear o actualizar una matrícula
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await API.put(`/matriculas/${editandoId}`, form);
                Swal.fire('Actualizada', 'Matrícula actualizada correctamente', 'success');
            } else {
                await API.post('/matriculas', form);
                Swal.fire('Creada', 'Matrícula creada correctamente', 'success');
            }
            setForm(camposVacios);
            setEditandoId(null);
            cargarMatriculas();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error al guardar matrícula' });
        }
    };

    // Carga los datos de una matrícula en el formulario para editar
    const handleEditar = (matricula) => {
        setForm({
            id_estudiante: matricula.id_estudiante,
            id_asignatura: matricula.id_asignatura,
            nota: matricula.nota || '',
        });
        setEditandoId(matricula.id_matricula);
    };

    // Elimina una matrícula tras confirmación
    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar matrícula?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });
        if (result.isConfirmed) {
            try {
                await API.delete(`/matriculas/${id}`);
                Swal.fire('Eliminada', 'Matrícula eliminada correctamente', 'success');
                cargarMatriculas();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error al eliminar matrícula' });
            }
        }
    };

    // Filtra por nombre del estudiante o nombre de la asignatura
    const filtrados = matriculas.filter((m) =>
        `${m.nombre_estudiante || ''} ${m.nombre_asignatura || ''}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(filtrados.length / porPagina);
    const paginados = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

    const cancelarEdicion = () => {
        setForm(camposVacios);
        setEditandoId(null);
    };

    return {
        form, editandoId, busqueda, pagina, porPagina,
        paginados, filtrados, totalPaginas,
        estudiantes, asignaturas,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    };
};

export default useMatriculas;