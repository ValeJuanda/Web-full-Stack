import {createContext, useContext, useState} from 'react';

// Crear el contecto de autenticación
const AuthContext = createContext();

// Crear el proveedor de autenticación para toda la app
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(
    localStorage.getItem('usuario') || null
);

// Esatdo del rol moderdor afmin usurio
const [rol, setRol] = useState(
    localStorage.getItem('rol') || null
);

//Etsado de la imagen del usuario
const [imagen, setImagen] = useState(
    localStorage.getItem('imagen') || null
);

// Login exitoso
const login = (datos) => {
    localStorage.setItem('token', datos.token);
    localStorage.setItem('usuario', datos.usuario);
    localStorage.setItem('rol', datos.rol);
    localStorage.setItem('imagen', datos.imagen);

    //Actualiza el estado de los componentes
    setUsuario(datos.usuario);
    setRol(datos.rol);
    setImagen(datos.imagen);
};

// Funcion cerrar sesion
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('imagen');
   //Limpiamo el estado
    setUsuario(null);
    setRol(null);
    setImagen(null);
};

// gUARDA los componentes con el probedor 
return (
    <AuthContext.Provider value={{ usuario, rol, imagen, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);