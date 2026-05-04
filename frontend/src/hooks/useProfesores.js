import { useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

// Hook que encapsula toda la lógica de profesores:
// carga, búsqueda, paginación, crear, editar y eliminar

const camposVacios = {
    nombre: '', apellido: '', direccion: '',
    poblacion: '', dni: '', fecha_nac: '',
    id_postal: '', telefono: ''
};

const useProfesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [form, setForm] = useState(camposVacios);
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const porPagina = 5;

    // Carga la lista de profesores desde el backend
    const cargarProfesores = async () => {
        try {
            const res = await API.get('/profesores');
            if (Array.isArray(res.data.data)) {
                setProfesores(res.data.data);
            } else if (Array.isArray(res.data)) {
                setProfesores(res.data);
            } else {
                setProfesores([]);
            }
        } catch (error) {
            setProfesores([]);
            Swal.fire({ icon: 'error', title: 'Error al cargar profesores' });
        }
    };

    useEffect(() => {
        cargarProfesores();
    }, []);

    // Actualiza el estado del formulario al cambiar cualquier input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envía el formulario para crear o actualizar un profesor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await API.put(`/profesores/${editandoId}`, form);
                Swal.fire('Actualizado', 'Profesor actualizado correctamente', 'success');
            } else {
                await API.post('/profesores', form);
                Swal.fire('Creado', 'Profesor creado correctamente', 'success');
            }
            setForm(camposVacios);
            setEditandoId(null);
            cargarProfesores();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error al guardar profesor' });
        }
    };

    // Carga los datos de un profesor en el formulario para editar
    const handleEditar = (prof) => {
        setForm({
            nombre: prof.nombre,
            apellido: prof.apellido,
            direccion: prof.direccion,
            poblacion: prof.poblacion,
            dni: prof.dni,
            fecha_nac: prof.fecha_nac ? prof.fecha_nac.split('T')[0] : '',
            id_postal: prof.id_postal,
            telefono: prof.telefono,
        });
        setEditandoId(prof.id_profesor);
    };

    // Elimina un profesor tras confirmación
    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar profesor?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });
        if (result.isConfirmed) {
            try {
                await API.delete(`/profesores/${id}`);
                Swal.fire('Eliminado', 'Profesor eliminado correctamente', 'success');
                cargarProfesores();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error al eliminar profesor' });
            }
        }
    };

    // Filtra por nombre, apellido o DNI
    const filtrados = profesores.filter((p) =>
        `${p.nombre} ${p.apellido} ${p.dni}`.toLowerCase().includes(busqueda.toLowerCase())
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

export default useProfesores;