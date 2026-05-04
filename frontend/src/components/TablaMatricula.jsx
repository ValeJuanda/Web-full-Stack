const TablaMatriculas = ({ paginados, totalPaginas, pagina, setPagina, busqueda, setBusqueda, rol, handleEditar, handleEliminar }) => {
    return (
        <>
            <input
                type="text"
                placeholder="Buscar por estudiante o asignatura..."
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="bg-white rounded-2xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Estudiante</th>
                            <th className="px-4 py-3 text-left">Asignatura</th>
                            <th className="px-4 py-3 text-left">Nota</th>
                            <th className="px-4 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginados.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-400">
                                    No hay matrículas registradas
                                </td>
                            </tr>
                        ) : (
                            paginados.map((m) => (
                                <tr key={m.id_matricula} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{m.nombre_estudiante}</td>
                                    <td className="px-4 py-3">{m.nombre_asignatura}</td>
                                    <td className="px-4 py-3">{m.nota ?? '—'}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            onClick={() => handleEditar(m)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                        >
                                            Editar
                                        </button>
                                        {rol === 'admin' && (
                                            <button
                                                onClick={() => handleEliminar(m.id_matricula)}
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

            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPaginas }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPagina(i + 1)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            pagina === i + 1
                                ? 'bg-red-600 text-white'
                                : 'bg-white text-red-600 border border-red-300'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default TablaMatriculas;