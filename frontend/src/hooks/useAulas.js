import { useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

const camposVacios = { piso: '', num_pupitres: '' };

const useAulas = () => {
    // Lista de aulas del backend
    const [aulas, setAulas] = useState([]);
    // Estado del formulario
    const [form, setForm] = useState(camposVacios);
    // Id del aula que se está editando, null = modo crear
    const [editandoId, setEditandoId] = useState(null);
    // Texto del buscador
    const [busqueda, setBusqueda] = useState('');
    // Página actual
    const [pagina, setPagina] = useState(1);
    const porPagina = 5;

    // Carga todas las aulas del backend
    const cargarAulas = async () => {
        try {
            const res = await API.get('/aulas');
            setAulas(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            setAulas([]);
            Swal.fire({ icon: 'error', title: 'Error al cargar aulas' });
        }
    };

    // Carga las aulas al montar el componente
    useEffect(() => {
        cargarAulas();
    }, []);

    // Actualiza el estado del formulario cuando el usuario escribe
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Crea o actualiza un aula según si editandoId tiene valor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await API.put(`/aulas/${editandoId}`, form);
                Swal.fire('Actualizado', 'Aula actualizada correctamente', 'success');
            } else {
                await API.post('/aulas', form);
                Swal.fire('Creado', 'Aula creada correctamente', 'success');
            }
            setForm(camposVacios);
            setEditandoId(null);
            cargarAulas();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error al guardar aula' });
        }
    };

    // Carga los datos del aula en el formulario para editarlos
    const handleEditar = (aula) => {
        setForm({
            piso: aula.piso,
            num_pupitres: aula.num_pupitres
        });
        setEditandoId(aula.id_aula);
    };

    // Elimina un aula con confirmación SweetAlert2
    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar aula?',
            text: '¿Seguro que deseas eliminar esta aula? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
            try {
                await API.delete(`/aulas/${id}`);
                Swal.fire('Eliminado', 'Aula eliminada correctamente', 'success');
                cargarAulas();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error al eliminar aula' });
            }
        }
    };

    // Filtra por piso
    const filtrados = aulas.filter((a) =>
        String(a.piso).includes(busqueda) ||
        String(a.num_pupitres).includes(busqueda)
    );

    const totalPaginas = Math.ceil(filtrados.length / porPagina);
    const paginados = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

    const cancelarEdicion = () => {
        setForm(camposVacios);
        setEditandoId(null);
    };

    return {
        form, editandoId, busqueda, pagina,
        paginados, totalPaginas,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    };
};

export default useAulas;