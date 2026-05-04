import { useNavigate } from 'react-router-dom';
import useProfesores from '../hooks/useProfesores';
import Navbar from '../components/Navbar';

const Profesores = () => {
    const navigate = useNavigate();

    const {
        busqueda, pagina, paginados, totalPaginas,
        setBusqueda, setPagina
    } = useProfesores();

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar titulo="Gestión de Profesores">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-blue-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </Navbar>

            <div className="max-w-6xl mx-auto p-6">

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
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Apellido</th>
                                <th className="px-4 py-3 text-left">DNI</th>
                                <th className="px-4 py-3 text-left">Teléfono</th>
                                <th className="px-4 py-3 text-left">Población</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginados.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-400">
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