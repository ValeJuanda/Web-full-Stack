import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuthHook';
import useEstudiantes from '../hooks/useEstudiante';
import Navbar from '../components/Navbar';
import FormEstudiante from '../components/FormEstudiante';
import TablaEstudiantes from '../components/TablaEstudiante';

const Estudiantes = () => {
    const { rol } = useAuth();
    const navigate = useNavigate();

    const {
        form, editandoId, busqueda, pagina, paginados,
        totalPaginas, handleChange, handleSubmit,
        handleEditar, handleEliminar, setBusqueda, setPagina, cancelarEdicion
    } = useEstudiantes();

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar titulo="Gestión de Estudiantes">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-blue-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </Navbar>

            <div className="max-w-6xl mx-auto p-6">

                <FormEstudiante
                    form={form}
                    editandoId={editandoId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelarEdicion={cancelarEdicion}
                />

                <TablaEstudiantes
                    paginados={paginados}
                    totalPaginas={totalPaginas}
                    pagina={pagina}
                    setPagina={setPagina}
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                    rol={rol}
                    handleEditar={handleEditar}
                    handleEliminar={handleEliminar}
                />
            </div>
        </div>
    );
};

export default Estudiantes;