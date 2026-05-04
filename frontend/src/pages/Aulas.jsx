import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAulas from '../hooks/useAulas';

const Aulas = () => {
    const navigate = useNavigate();
    const { rol } = useAuth();

    // El hook maneja toda la lógica de aulas
    const {
        form, editandoId, busqueda, pagina,
        paginados, totalPaginas,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    } = useAulas();

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Barra de navegación */}
            <nav className="bg-orange-700 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Gestión de Aulas</h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-orange-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </nav>

            <div className="max-w-4xl mx-auto p-6">

                {/* Formulario crear o editar */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        {editandoId ? 'Editar Aula' : 'Nueva Aula'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Piso donde se encuentra el aula */}
                        <input
                            type="number"
                            name="piso"
                            value={form.piso}
                            onChange={handleChange}
                            placeholder="Piso"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        {/* Número de pupitres del aula */}
                        <input
                            type="number"
                            name="num_pupitres"
                            value={form.num_pupitres}
                            onChange={handleChange}
                            placeholder="Número de pupitres"
                            required
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition"
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

                {/* Buscador por piso o número de pupitres */}
                <input
                    type="text"
                    placeholder="Buscar por piso o número de pupitres..."
                    value={busqueda}
                    onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* Tabla */}
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-orange-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">ID Aula</th>
                                <th className="px-4 py-3 text-left">Piso</th>
                                <th className="px-4 py-3 text-left">Número de Pupitres</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginados.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-400">
                                        No hay aulas registradas
                                    </td>
                                </tr>
                            ) : (
                                paginados.map((aula) => (
                                    <tr key={aula.id_aula} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3">{aula.id_aula}</td>
                                        <td className="px-4 py-3">{aula.piso}</td>
                                        <td className="px-4 py-3">{aula.num_pupitres}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            {/* Todos los roles pueden editar */}
                                            <button
                                                onClick={() => handleEditar(aula)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                            >
                                                Editar
                                            </button>
                                            {/* Solo admin puede eliminar */}
                                            {rol === 'admin' && (
                                                <button
                                                    onClick={() => handleEliminar(aula.id_aula)}
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
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white text-orange-600 border border-orange-300'
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

export default Aulas;