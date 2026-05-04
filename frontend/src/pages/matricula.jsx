import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuthHook';
import useMatriculas from '../hooks/usematricula';
import Navbar from '../components/Navbar';
import FormMatricula from '../components/FormMatricula';
import TablaMatriculas from '../components/TablaMatricula';

const Matriculas = () => {
    const { rol } = useAuth();
    const navigate = useNavigate();

    const {
        form, editandoId, busqueda, pagina, paginados,
        totalPaginas, estudiantes, asignaturas,
        handleChange, handleSubmit, handleEditar, handleEliminar,
        setBusqueda, setPagina, cancelarEdicion
    } = useMatriculas();

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar titulo="Gestión de Matrículas">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white text-blue-700 px-4 py-1 rounded-lg text-sm font-medium"
                >
                    Volver al Dashboard
                </button>
            </Navbar>

            <div className="max-w-6xl mx-auto p-6">

                <FormMatricula
                    form={form}
                    editandoId={editandoId}
                    estudiantes={estudiantes}
                    asignaturas={asignaturas}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelarEdicion={cancelarEdicion}
                />

                <TablaMatriculas
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

export default Matriculas;