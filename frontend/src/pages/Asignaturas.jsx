import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAsignaturas from '../hooks/useAsignaturas';

const Asignaturas = () => {
    const navigate = useNavigate();
    const { rol } = useAuth();

    const {
        form, editandoId, busqueda, pagina,
        paginados, totalPaginas, profesores, cursos,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    } = useAsignaturas();

    return (
        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <nav className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Asignaturas</h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-teal-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </nav>

            <div className="max-w-4xl mx-auto p-6">

                {/* FORMULARIO */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        {editandoId ? 'Editar Asignatura' : 'Nueva Asignatura'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />

                        <input
                            type="number"
                            name="horas_semana"
                            value={form.horas_semana}
                            onChange={handleChange}
                            placeholder="Horas por semana"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />

                        <select
                            name="id_profesor"
                            value={form.id_profesor}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            <option value="">Sin profesor</option>
                            {profesores.map((p) => (
                                <option key={p.id_profesor} value={p.id_profesor}>
                                    {p.nombre} {p.apellido}
                                </option>
                            ))}
                        </select>

                        <select
                            name="id_curso"
                            value={form.id_curso}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            <option value="">Sin curso</option>
                            {cursos.map((c) => (
                                <option key={c.id_curso} value={c.id_curso}>
                                    {c.nombre}
                                </option>
                            ))}
                        </select>

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                {editandoId ? 'Actualizar' : 'Guardar'}
                            </button>

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

                {/* BUSCADOR */}
                <input
                    type="text"
                    placeholder="Buscar asignatura..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                {/* TABLA */}
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-teal-300 text-teal-900">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Horas</th>
                                <th className="px-4 py-3 text-left">Profesor</th>
                                <th className="px-4 py-3 text-left">Curso</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginados.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-400">
                                        No hay asignaturas
                                    </td>
                                </tr>
                            ) : (
                                paginados.map((a) => (
                                    <tr key={a.id_asignatura} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3">{a.nombre}</td>
                                        <td className="px-4 py-3">{a.horas_semana}</td>
                                        <td className="px-4 py-3">{a.nombre_profesor || 'Sin profesor'}</td>
                                        <td className="px-4 py-3">{a.nombre_curso || 'Sin curso'}</td>

                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                onClick={() => handleEditar(a)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                            >
                                                Editar
                                            </button>

                                            {rol === 'admin' && (
                                                <button
                                                    onClick={() => handleEliminar(a.id_asignatura)}
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

                {/* PAGINACIÓN */}
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPagina(i + 1)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                pagina === i + 1
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-white text-teal-600 border border-teal-300'
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

export default Asignaturas;