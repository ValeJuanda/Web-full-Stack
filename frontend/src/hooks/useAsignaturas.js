import { useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

const camposVacios = {
    nombre: '',
    horas_semana: '',
    id_profesor: '',
    id_curso: ''
};

const useAsignaturas = () => {
    const [asignaturas, setAsignaturas] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [cursos, setCursos] = useState([]);

    const [form, setForm] = useState(camposVacios);
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const porPagina = 5;

    const cargarAsignaturas = async () => {
        try {
            const res = await API.get('/asignaturas');
            setAsignaturas(res.data.data || []);
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error al cargar asignaturas', 'error');
        }
    };

    const cargarProfesores = async () => {
        try {
            const res = await API.get('/profesores');
            setProfesores(res.data.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarCursos = async () => {
        try {
            const res = await API.get('/cursos');
            setCursos(res.data.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarAsignaturas();
        cargarProfesores();
        cargarCursos();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await API.put(`/asignaturas/${editandoId}`, form);
                Swal.fire('Actualizado', 'Asignatura actualizada', 'success');
            } else {
                await API.post('/asignaturas', form);
                Swal.fire('Creado', 'Asignatura creada', 'success');
            }
            setForm(camposVacios);
            setEditandoId(null);
            cargarAsignaturas();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error al guardar asignatura', 'error');
        }
    };

    const handleEditar = (asig) => {
        setForm({
            nombre: asig.nombre,
            horas_semana: asig.horas_semana,
            id_profesor: asig.id_profesor || '',
            id_curso: asig.id_curso || ''
        });
        setEditandoId(asig.id_asignatura);
    };

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar?',
            text: 'No se puede deshacer',
            icon: 'warning',
            showCancelButton: true
        });

        if (confirm.isConfirmed) {
            try {
                await API.delete(`/asignaturas/${id}`);
                Swal.fire('Eliminado', '', 'success');
                cargarAsignaturas();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar', 'error');
            }
        }
    };

    const filtrados = asignaturas.filter((a) =>
        a.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(filtrados.length / porPagina);
    const paginados = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

    const cancelarEdicion = () => {
        setForm(camposVacios);
        setEditandoId(null);
    };

    return {
        form, editandoId, busqueda, pagina,
        paginados, totalPaginas, profesores, cursos,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    };
};

export default useAsignaturas;