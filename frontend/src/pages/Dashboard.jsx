import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuthHook';
import useStats from '../hooks/useStats';
import Navbar from '../components/Navbar';
import BadgeRol from '../components/BadgeRol';
import StatCard from '../components/StatCard';

const Dashboard = () => {
    const { usuario, rol, imagen, logout } = useAuth();
    const stats = useStats();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/login');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar titulo="Centro de Enseñanza">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm font-medium transition"
                >
                    Cerrar sesión
                </button>
            </Navbar>

            <div className="max-w-5xl mx-auto p-6">

                {/* Tarjeta del perfil */}
                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 mb-6">
                    <img
                        src={imagen || `https://ui-avatars.com/api/?name=${usuario}&background=3b82f6&color=fff`}
                        alt="Perfil"
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{usuario}</h2>
                        <BadgeRol rol={rol} />
                    </div>
                </div>

                {/* Cards de estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard valor={stats.estudiantes} label="Estudiantes" color="text-blue-600" />
                    <StatCard valor={stats.profesores} label="Profesores" color="text-green-600" />
                    <StatCard valor={stats.cursos} label="Cursos" color="text-purple-600" />
                </div>

                {/* Módulos con control de acceso por rol */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Módulos disponibles</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                        {/* Estudiantes: todos los roles */}
                        <button
                            onClick={() => navigate('/estudiantes')}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 rounded-xl transition"
                        >
                            Estudiantes
                        </button>

                        {/* Profesores: admin y moderador */}
                        {(rol === 'admin' || rol === 'moderador') && (
                            <button
                                onClick={() => navigate('/profesores')}
                                className="bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 rounded-xl transition"
                            >
                                Profesores
                            </button>
                        )}

                        {/* Cursos: solo admin */}
                        {rol === 'admin' && (
                            <button
                                onClick={() => navigate('/cursos')}
                                className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium py-3 rounded-xl transition"
                            >
                                Cursos
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;