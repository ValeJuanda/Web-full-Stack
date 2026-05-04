import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Hook para acceder al contexto de autenticación desde cualquier componente
const useAuth = () => useContext(AuthContext);

export default useAuth;