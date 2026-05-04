import { useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

// Hook que encapsula toda la lógica de estudiantes:
// carga, búsqueda, paginación, crear, editar y eliminar

const camposVacios = {
    nombre: '', apellido: '', direccion: '',
    poblacion: '', dni: '', fecha_nac: '',
    id_postal: '', telefono: ''
};

const useEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [form, setForm] = useState(camposVacios);
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const porPagina = 5;

    // Carga la lista de estudiantes desde el backend
    const cargarEstudiantes = async () => {
        try {
            const res = await API.get('/estudiantes');
            if (Array.isArray(res.data.data)) {
                setEstudiantes(res.data.data);
            } else if (Array.isArray(res.data)) {
                setEstudiantes(res.data);
            } else {
                setEstudiantes([]);
            }
        } catch (error) {
            setEstudiantes([]);
            Swal.fire({ icon: 'error', title: 'Error al cargar estudiantes' });
        }
    };

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    // Actualiza el estado del formulario al cambiar cualquier input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envía el formulario para crear o actualizar un estudiante
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await API.put(`/estudiantes/${editandoId}`, form);
                Swal.fire('Actualizado', 'Estudiante actualizado correctamente', 'success');
            } else {
                await API.post('/estudiantes', form);
                Swal.fire('Creado', 'Estudiante creado correctamente', 'success');
            }
            setForm(camposVacios);
            setEditandoId(null);
            cargarEstudiantes();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error al guardar estudiante' });
        }
    };

    // Carga los datos de un estudiante en el formulario para editar
    const handleEditar = (estu) => {
        setForm({
            nombre: estu.nombre,
            apellido: estu.apellido,
            direccion: estu.direccion,
            poblacion: estu.poblacion,
            dni: estu.dni,
            fecha_nac: estu.fecha_nac ? estu.fecha_nac.split('T')[0] : '',
            id_postal: estu.id_postal,
            telefono: estu.telefono,
        });
        setEditandoId(estu.id_estudiante);
    };

    // Elimina un estudiante tras confirmación
    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar estudiante?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });
        if (result.isConfirmed) {
            try {
                await API.delete(`/estudiantes/${id}`);
                Swal.fire('Eliminado', 'Estudiante eliminado correctamente', 'success');
                cargarEstudiantes();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error al eliminar estudiante' });
            }
        }
    };

    // Filtra por nombre, apellido o DNI
    const filtrados = estudiantes.filter((e) =>
        `${e.nombre} ${e.apellido} ${e.dni}`.toLowerCase().includes(busqueda.toLowerCase())
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
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    };
};

export default useEstudiantes;