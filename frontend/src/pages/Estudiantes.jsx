import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

// campos vacios
const camposVacios = {
    nombre: '', apellido: '', direccion: '',
    poblacion: '', dni: '', fecha_nacimiento: '',
    id_postal: '', telefono: ''
};

const Estudiantes = () => {
    // 1 estudiante del backend
    const [estudiantes, setEstudiantes] = useState([]);
    // 2 Estado formularios 
    const [form, setForm] = useState(camposVacios);
    // 3 Guardar id
    const [editandoId, setEditandoId] = useState(null);
    //4 Texto usurio 
    const [busqueda, setBusqueda] = useState('');
    //5 tabla paginada
    const [pagina, setPagina] = useState(1);
    //6 Registos toral
    const porPagina = 5;
    //7 rol usuario 
    const { rol } = useAuth();
    //8 Navegacion
    const navigate = useNavigate();
// Cargar estudiantes del backend
const cargarEstudinates = async () => {
    try {
        const res = await API.get('/estudiantes');
        console.log('Respuesta del backend:', res.data); // para ver qué llega
        // Verifica si res.data.data existe y es array
        if (Array.isArray(res.data.data)) {
            setEstudiantes(res.data.data);
        } else if (Array.isArray(res.data)) {
            setEstudiantes(res.data);
        } else {
            setEstudiantes([]);
        }
    } catch (error) {
        console.log('Error:', error);
        setEstudiantes([]);
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar estudiantes',
        });
    }
};
    // Cargar estudiantes al montar el componente
    useEffect(() => {
        cargarEstudinates();
    }, []);

    // Actualizar el estado del formulario al cambiar los inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Maneja el envío del formulario para crear o editar un estudiante
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
            // Limpiar formulario y recargar estudiantes
            setForm(camposVacios);
            setEditandoId(null);
            cargarEstudinates();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear o actualizar estudiante',
            });
        }
    };
    // Dtaos del estudiante para editar en el formulario
    const handleEditar = (estu) => {
        setForm({
            nombre: estu.nombre,
            apellido: estu.apellido,
            direccion: estu.direccion,
            poblacion: estu.poblacion,
            dni: estu.dni,
            fecha_nacimiento: estu.fecha_nacimiento ? estu.fecha_nacimiento.split('T')[0] : '',
            id_postal: estu.id_postal,
            telefono: estu.telefono,
        });
        // Guardame id
        setEditandoId(estu.id_estudiante);
    };

    //Eliminar estudiante
    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar estudiante?',
            text: 'Eliminar estudiante ${nombre}?',
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
                cargarEstudinates();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar estudiante',
                });
            }
        }
    };

    //filtrar estudiantes por busqueda
    // Filtra la lista según lo que el usuario escribió en el buscador
    const filtrados = estudiantes.filter((e) =>
        `${e.nombre} ${e.apellido} ${e.dni}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Calcula el total de páginas
    const totalPaginas = Math.ceil(filtrados.length / porPagina);

    // Corta el array para mostrar solo los registros de la página actual
    const paginados = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);


    return (
        <div className="min-h-screen bg-gray-100">

            {/* Barra de navegación superior */}
            <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Gestión de Estudiantes</h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-blue-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </nav>

            <div className="max-w-6xl mx-auto p-6">

                {/* Formulario para crear o editar estudiantes
            El título cambia según si estamos en modo crear o editar */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        {editandoId ? 'Editar Estudiante' : 'Nuevo Estudiante'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Genera los inputs dinámicamente desde un array de campos
                para no repetir el mismo código para cada campo */}
                        {[
                            { name: 'nombre', placeholder: 'Nombre' },
                            { name: 'apellido', placeholder: 'Apellido' },
                            { name: 'dni', placeholder: 'DNI' },
                            { name: 'telefono', placeholder: 'Teléfono' },
                            { name: 'direccion', placeholder: 'Dirección' },
                            { name: 'poblacion', placeholder: 'Población' },
                            { name: 'id_postal', placeholder: 'Código Postal' },
                        ].map((campo) => (
                            <input
                                key={campo.name}
                                name={campo.name}
                                value={form[campo.name]}
                                onChange={handleChange}
                                placeholder={campo.placeholder}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}

                        {/* Input de fecha separado porque usa type="date" */}
                        <input
                            type="date"
                            name="fecha_nac"
                            value={form.fecha_nac}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="md:col-span-2 flex gap-3">
                            {/* Botón de guardar: cambia texto según el modo */}
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                {editandoId ? 'Actualizar' : 'Guardar'}
                            </button>

                            {/* Botón cancelar: solo aparece en modo editar */}
                            {editandoId && (
                                <button
                                    type="button"
                                    onClick={() => { setForm(camposVacios); setEditandoId(null); }}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Campo de búsqueda para filtrar la tabla
            Al escribir resetea la paginación a la página 1 */}
                <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o DNI..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Tabla de estudiantes con los registros de la página actual */}
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Apellido</th>
                                <th className="px-4 py-3 text-left">DNI</th>
                                <th className="px-4 py-3 text-left">Teléfono</th>
                                <th className="px-4 py-3 text-left">Población</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Si no hay registros muestra un mensaje */}
                            {paginados.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-400">
                                        No hay estudiantes registrados
                                    </td>
                                </tr>
                            ) : (
                                paginados.map((est) => (
                                    <tr key={est.id_estudiante} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3">{est.nombre}</td>
                                        <td className="px-4 py-3">{est.apellido}</td>
                                        <td className="px-4 py-3">{est.dni}</td>
                                        <td className="px-4 py-3">{est.telefono}</td>
                                        <td className="px-4 py-3">{est.poblacion}</td>
                                        <td className="px-4 py-3 flex gap-2">

                                            {/* Botón editar: todos los roles pueden editar */}
                                            <button
                                                onClick={() => handleEditar(est)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                            >
                                                Editar
                                            </button>

                                            {/* Botón eliminar: solo el admin puede eliminar
                          Control de acceso por rol en el frontend */}
                                            {rol === 'admin' && (
                                                <button
                                                    onClick={() => handleEliminar(est.id_estudiante, est.nombre)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Botones de paginación generados dinámicamente
            El botón de la página actual se resalta en azul */}
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPagina(i + 1)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${pagina === i + 1
                                ? 'bg-blue-600 text-white'        // página actual
                                : 'bg-white text-blue-600 border border-blue-300' // otras páginas
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Estudiantes;