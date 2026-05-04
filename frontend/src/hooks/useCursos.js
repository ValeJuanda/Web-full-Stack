import { useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

// Campos vacíos del formulario de cursos
const camposVacios = { nombre: '', id_profesor: '' };

const useCursos = () => {
    // Lista de cursos del backend
    const [cursos, setCursos] = useState([]);
    // Lista de profesores para el selector de tutor
    const [profesores, setProfesores] = useState([]);
    // Estado del formulario
    const [form, setForm] = useState(camposVacios);
    // Id del curso que se está editando, null = modo crear
    const [editandoId, setEditandoId] = useState(null);
    // Texto del buscador
    const [busqueda, setBusqueda] = useState('');
    // Página actual
    const [pagina, setPagina] = useState(1);
    const porPagina = 5;

    // Carga todos los cursos del backend
    const cargarCursos = async () => {
        try {
            const res = await API.get('/cursos');
            setCursos(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            setCursos([]);
            Swal.fire({ icon: 'error', title: 'Error al cargar cursos' });
        }
    };

    // Carga los profesores para mostrarlos en el selector de tutor
    const cargarProfesores = async () => {
        try {
            const res = await API.get('/profesores');
            setProfesores(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            setProfesores([]);
        }
    };

    // Carga cursos y profesores al montar el componente
    useEffect(() => {
        cargarCursos();
        cargarProfesores();
    }, []);

    // Actualiza el estado del formulario cuando el usuario escribe
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Crea o actualiza un curso según si editandoId tiene valor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await API.put(`/cursos/${editandoId}`, form);
                Swal.fire('Actualizado', 'Curso actualizado correctamente', 'success');
            } else {
                await API.post('/cursos', form);
                Swal.fire('Creado', 'Curso creado correctamente', 'success');
            }
            setForm(camposVacios);
            setEditandoId(null);
            cargarCursos();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error al guardar curso' });
        }
    };

    // Carga los datos del curso en el formulario para editarlos
    const handleEditar = (curso) => {
        setForm({
            nombre: curso.nombre,
            // id_profesor puede ser null si no tiene tutor
            id_profesor: curso.id_profesor || ''
        });
        setEditandoId(curso.id_curso);
    };

    // Elimina un curso con confirmación SweetAlert2
    const handleEliminar = async (id, nombre) => {
        const result = await Swal.fire({
            title: '¿Eliminar curso?',
            text: `¿Seguro que deseas eliminar ${nombre}? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
            try {
                await API.delete(`/cursos/${id}`);
                Swal.fire('Eliminado', 'Curso eliminado correctamente', 'success');
                cargarCursos();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error al eliminar curso' });
            }
        }
    };

    // Filtra por nombre del curso
    const filtrados = cursos.filter((c) =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(filtrados.length / porPagina);
    const paginados = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

    // Cancela la edición y limpia el formulario
    const cancelarEdicion = () => {
        setForm(camposVacios);
        setEditandoId(null);
    };

    return {
        form, editandoId, busqueda, pagina,
        paginados, filtrados, totalPaginas, profesores,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    };
};

export default useCursos;