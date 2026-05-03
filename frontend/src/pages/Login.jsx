import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
//Api
import API from '../services/api';
// SweetAlert2
import Swal from 'sweetalert2';

const Login = () => {
    const [form, setForm] = useState({ usuario: '', password: '' });
    const [cargando, setCargando] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    // Maneja los cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    // Maneja el envío del formulario de login
    const handleSubmit = async (e) => {
        // evita se reacargue al enviar el formulario
        e.preventDefault();
        setCargando(true);
        try {
            // Enviar user y pass al backend para obtener el token JWT
            const re = await API.post('/auth/login', form);
            login(re.data.token);
            navigate('/dashboard');

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio',
                text: error.response?.data?.message || 'error al iniciar sesión'
            });
        } finally {
            setCargando(false);
        }
    };
    return (
        // Centra el formulario en la pantalla con fondo gris
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            {/* Tarjeta blanca del formulario */}
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
                    Centro de Enseñanza
                </h1>
                <p className="text-center text-gray-500 mb-6">Inicia sesión para continuar</p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Usuario
                        </label>
                        {/* name="usuario" conecta este input con el estado form.usuario */}
                        <input
                            type="text"
                            name="usuario"
                            value={form.usuario}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        {/* type="password" oculta los caracteres mientras el usuario escribe */}
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* disabled={cargando} deshabilita el botón mientras espera la respuesta */}
                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {/* Cambia el texto del botón según si está cargando o no */}
                        {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;