import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuthHook';

// Componente que protege rutas privadas
// Si hay usuario logueado muestra el contenido, si no redirige al login

const RutaProtegida = ({ children }) => {
    const { usuario } = useAuth();
    return usuario ? children : <Navigate to="/login" />;
};

export default RutaProtegida;