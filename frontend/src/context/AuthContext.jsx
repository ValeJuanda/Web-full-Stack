import { createContext, useContext, useState } from 'react';

// Exportamos AuthContext para que useAuth.js pueda importarlo directamente
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(
        localStorage.getItem('usuario') || null
    );

    const [rol, setRol] = useState(
        localStorage.getItem('rol') || null
    );

    const [imagen, setImagen] = useState(
        localStorage.getItem('imagen') || null
    );

    // Login: guarda token y datos en localStorage y actualiza el estado
    const login = (datos) => {
        localStorage.setItem('token', datos.token);
        localStorage.setItem('usuario', datos.usuario);
        localStorage.setItem('rol', datos.rol);
        localStorage.setItem('imagen', datos.imagen);
        setUsuario(datos.usuario);
        setRol(datos.rol);
        setImagen(datos.imagen);
    };

    // Logout: limpia localStorage y resetea el estado
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
        localStorage.removeItem('imagen');
        setUsuario(null);
        setRol(null);
        setImagen(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, rol, imagen, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook directo (alternativa a importar desde hooks/useAuth.js)
export const useAuth = () => useContext(AuthContext);