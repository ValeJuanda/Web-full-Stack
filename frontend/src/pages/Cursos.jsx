import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useCursos from '../hooks/useCursos';

const Cursos = () => {
    const navigate = useNavigate();
    const { rol } = useAuth();

    // El hook maneja toda la lógica de cursos
    const {
        form, editandoId, busqueda, pagina,
        paginados, totalPaginas, profesores,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    } = useCursos();

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Barra de navegación */}
            <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Gestión de Cursos</h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-purple-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </nav>

            <div className="max-w-5xl mx-auto p-6">

                {/* Formulario crear o editar */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        {editandoId ? 'Editar Curso' : 'Nuevo Curso'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Nombre del curso */}
                        <input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del curso"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Selector de profesor tutor cargado desde el backend */}
                        <select
                            name="id_profesor"
                            value={form.id_profesor}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Sin tutor asignado</option>
                            {profesores.map((p) => (
                                <option key={p.id_profesor} value={p.id_profesor}>
                                    {p.nombre} {p.apellido}
                                </option>
                            ))}
                        </select>

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                {editandoId ? 'Actualizar' : 'Guardar'}
                            </button>
                            {/* Botón cancelar solo aparece en modo editar */}
                            {editandoId && (
                                <button
                                    type="button"
                                    onClick={cancelarEdicion}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Buscador */}
                <input
                    type="text"
                    placeholder="Buscar por nombre del curso..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Tabla */}
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Tutor</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginados.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-6 text-gray-400">
                                        No hay cursos registrados
                                    </td>
                                </tr>
                            ) : (
                                paginados.map((curso) => (
                                    <tr key={curso.id_curso} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3">{curso.nombre}</td>
                                        {/* nombre_profesor viene del JOIN en el modelo */}
                                        <td className="px-4 py-3">{curso.nombre_profesor || 'Sin tutor'}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            {/* Todos los roles pueden editar */}
                                            <button
                                                onClick={() => handleEditar(curso)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                            >
                                                Editar
                                            </button>
                                            {/* Solo admin puede eliminar */}
                                            {rol === 'admin' && (
                                                <button
                                                    onClick={() => handleEliminar(curso.id_curso, curso.nombre)}
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
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-purple-600 border border-purple-300'
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

export default Cursos;