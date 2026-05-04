import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import useProfesores from '../hooks/useProfesores';

// Campos vacíos del formulario
const camposVacios = {
    nombre: '', apellido: '', direccion: '',
    poblacion: '', dni: '', fecha_nac: '',
    id_postal: '', telefono: ''
};

const Profesores = () => {
    const navigate = useNavigate();
    const { rol } = useAuth();

    // Hook que carga la lista de profesores con búsqueda y paginación
    const {
        busqueda, pagina, paginados, totalPaginas,
        setBusqueda, setPagina, recargar
    } = useProfesores();

    // Estado del formulario
    const [form, setForm] = useState(camposVacios);
    // Id del profesor que se está editando, null = modo crear
    const [editandoId, setEditandoId] = useState(null);

    // Actualiza el estado del formulario cuando el usuario escribe
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Crea o actualiza un profesor según si editandoId tiene valor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                // Si editandoId tiene un id actualiza con PUT
                await API.put(`/profesores/${editandoId}`, form);
                Swal.fire('Actualizado', 'Profesor actualizado correctamente', 'success');
            } else {
                // Si editandoId es null crea con POST
                await API.post('/profesores', form);
                Swal.fire('Creado', 'Profesor creado correctamente', 'success');
            }
            // Limpia el formulario y recarga la lista
            setForm(camposVacios);
            setEditandoId(null);
            recargar();
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error al guardar profesor', text: error.response?.data?.message });
        }
    };

    // Carga los datos del profesor en el formulario para editarlos
    const handleEditar = (prof) => {
        setForm({
            nombre: prof.nombre,
            apellido: prof.apellido,
            direccion: prof.direccion,
            poblacion: prof.poblacion,
            dni: prof.dni,
            // Convierte la fecha de MySQL al formato que entiende el input date
            fecha_nac: prof.fecha_nac ? prof.fecha_nac.split('T')[0] : '',
            id_postal: prof.id_postal,
            telefono: prof.telefono
        });
        // Guarda el id para saber que estamos en modo editar
        setEditandoId(prof.id_profesor);
    };

    // Elimina un profesor con confirmación SweetAlert2
    const handleEliminar = async (id, nombre) => {
        const result = await Swal.fire({
            title: '¿Eliminar profesor?',
            text: `¿Seguro que deseas eliminar a ${nombre}? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
            try {
                await API.delete(`/profesores/${id}`);
                Swal.fire('Eliminado', 'Profesor eliminado correctamente', 'success');
                // Recarga la lista para reflejar el cambio
                recargar();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error al eliminar profesor' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Barra de navegación */}
            <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Gestión de Profesores</h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-green-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </nav>

            <div className="max-w-6xl mx-auto p-6">

                {/* Formulario crear o editar */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        {editandoId ? 'Editar Profesor' : 'Nuevo Profesor'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        ))}

                        {/* Input de fecha separado porque usa type="date" */}
                        <input
                            type="date"
                            name="fecha_nac"
                            value={form.fecha_nac}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                {editandoId ? 'Actualizar' : 'Guardar'}
                            </button>
                            {/* Botón cancelar solo aparece en modo editar */}
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

                {/* Buscador: al escribir resetea la paginación a página 1 */}
                <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o DNI..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Tabla de profesores */}
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-green-600 text-white">
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
                            {paginados.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-400">
                                        No hay profesores registrados
                                    </td>
                                </tr>
                            ) : (
                                paginados.map((prof) => (
                                    <tr key={prof.id_profesor} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3">{prof.nombre}</td>
                                        <td className="px-4 py-3">{prof.apellido}</td>
                                        <td className="px-4 py-3">{prof.dni}</td>
                                        <td className="px-4 py-3">{prof.telefono}</td>
                                        <td className="px-4 py-3">{prof.poblacion}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            {/* Botón editar: todos los roles pueden editar */}
                                            <button
                                                onClick={() => handleEditar(prof)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                            >
                                                Editar
                                            </button>
                                            {/* Botón eliminar: solo el admin puede eliminar */}
                                            {rol === 'admin' && (
                                                <button
                                                    onClick={() => handleEliminar(prof.id_profesor, prof.nombre)}
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

                {/* Paginación */}
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPagina(i + 1)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                pagina === i + 1
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-green-600 border border-green-300'
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

export default Profesores;