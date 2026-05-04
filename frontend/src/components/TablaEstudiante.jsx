// Tabla paginada de estudiantes con búsqueda y acciones por rol
// Recibe: paginados, totalPaginas, pagina, setPagina,
//         busqueda, setBusqueda, rol, handleEditar, handleEliminar

const TablaEstudiantes = ({
    paginados, totalPaginas, pagina, setPagina,
    busqueda, setBusqueda, rol, handleEditar, handleEliminar
}) => {
    return (
        <>
            {/* Buscador */}
            <input
                type="text"
                placeholder="Buscar por nombre, apellido o DNI..."
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Tabla */}
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
                                        <button
                                            onClick={() => handleEditar(est)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                                        >
                                            Editar
                                        </button>
                                        {/* Eliminar solo para admin */}
                                        {rol === 'admin' && (
                                            <button
                                                onClick={() => handleEliminar(est.id_estudiante)}
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
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${pagina === i + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border border-blue-300'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default TablaEstudiantes;