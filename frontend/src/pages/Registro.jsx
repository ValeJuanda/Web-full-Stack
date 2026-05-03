// Importa useState para manejar el estado del formulario
import { useState } from 'react';
// Importa useNavigate para redirigir después del registro
import { useNavigate } from 'react-router-dom';
// Importa la instancia de Axios configurada
import API from '../services/api';
// Importa SweetAlert2 para las alertas
import Swal from 'sweetalert2';

const Registro = () => {

    // Estado del formulario con los campos usuario, password y rol
    const [form, setForm] = useState({ usuario: '', password: '', rol: 'usuario' });

    // Estado de carga para deshabilitar el botón mientras espera respuesta
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    // Actualiza el estado del formulario cuando el usuario escribe
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            // Envía los datos al backend en POST /api/auth/registro
            await API.post('/auth/registro', form);
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'Ya puedes iniciar sesión',
            });
            // Redirige al login después del registro exitoso
            navigate('/login');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al crear usuario',
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
                    Crear Usuario
                </h1>
                <p className="text-center text-gray-500 mb-6">Registra un nuevo usuario</p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Campo usuario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Usuario
                        </label>
                        <input
                            type="text"
                            name="usuario"
                            value={form.usuario}
                            onChange={handleChange}
                            placeholder="Ingresa el usuario"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Campo contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Ingresa la contraseña"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Campo rol: selección entre admin, usuario y moderador */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rol
                        </label>
                        <select
                            name="rol"
                            value={form.rol}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="usuario">Usuario</option>
                            <option value="moderador">Moderador</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Botón de registro */}
                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {cargando ? 'Creando usuario...' : 'Crear Usuario'}
                    </button>

                    {/* Enlace para volver al login */}
                    <p className="text-center text-sm text-gray-500">
                        ¿Ya tienes cuenta?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Inicia sesión
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registro;