import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Swal from 'sweetalert2';

const Dashboard = () => {
    // Leer datos usuario logueado
    const { usuario, rol, imagen, logout } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        estudiantes: 0,
        profesores: 0,
        cursos: 0,
    });

    useEffect(() => {
        const cargarStats = async () => {
            try {
                const [est, prof, cur] = await Promise.all([
                    API.get('/estudiantes'),
                    API.get('/profesores'),
                    API.get('/cursos'),
                ]);
                setStats({
                    estudiantes: est.data.length,
                    profesores: prof.data.length,
                    cursos: cur.data.length,
                });
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
            }
        };
        cargarStats();
    }, []);

    // Una funcion del boton cerrar sesion
    const handleLogout = () => {
        // Confirmciion SweetAlert2 ante de cerrar
        Swal.fire({
            title: '¿Cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            //Para cerrar solo seccion si comfirma usuario 
            if (result.isConfirmed) {
                logout();
                navigate('/login');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Barra de navegación superior */}
            <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-xl font-bold">Centro de Enseñanza</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm font-medium transition"
                >
                    Cerrar sesión
                </button>
            </nav>

            <div className="max-w-5xl mx-auto p-6">

                {/* Tarjeta del perfil del usuario */}
                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 mb-6">

                    {/* Si el usuario tiene imagen la muestra
              Si no tiene, genera un avatar con las iniciales usando ui-avatars.com */}
                    <img
                        src={imagen || 'https://ui-avatars.com/api/?name=' + usuario + '&background=3b82f6&color=fff'}
                        alt="Perfil"
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{usuario}</h2>

                        {/* Badge del rol con color diferente según el tipo
                admin = rojo, moderador = amarillo, usuario = verde */}
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${rol === 'admin' ? 'bg-red-100 text-red-600' :
                                rol === 'moderador' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-green-100 text-green-600'
                            }`}>
                            {rol}
                        </span>
                    </div>
                </div>

                {/* Cards de estadísticas: muestra el total de cada entidad */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <p className="text-4xl font-bold text-blue-600">{stats.estudiantes}</p>
                        <p className="text-gray-500 mt-1">Estudiantes</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <p className="text-4xl font-bold text-green-600">{stats.profesores}</p>
                        <p className="text-gray-500 mt-1">Profesores</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <p className="text-4xl font-bold text-purple-600">{stats.cursos}</p>
                        <p className="text-gray-500 mt-1">Cursos</p>
                    </div>
                </div>

                {/* Menú de navegación con control de acceso por rol
            Cada botón solo aparece si el usuario tiene el rol correspondiente */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Módulos disponibles</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                        {/* Estudiantes: todos los roles pueden verlo */}
                        <button
                            onClick={() => navigate('/estudiantes')}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 rounded-xl transition"
                        >
                            Estudiantes
                        </button>

                        {/* Profesores: solo admin y moderador pueden verlo */}
                        {(rol === 'admin' || rol === 'moderador') && (
                            <button
                                onClick={() => navigate('/profesores')}
                                className="bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 rounded-xl transition"
                            >
                                Profesores
                            </button>
                        )}

                        {/* Cursos: solo el admin puede verlo */}
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