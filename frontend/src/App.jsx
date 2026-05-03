// Importa las herramientas de navegación de React Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importa el proveedor y el hook del contexto de autenticación
import { AuthProvider, useAuth } from './context/AuthContext';

// Importa las páginas de la aplicación
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Estudiantes from './pages/Estudiantes';
import Registro from './pages/Registro';

// Componente que protege las rutas privadas
// Si hay usuario logueado muestra el contenido, si no redirige al login
const RutaProtegida = ({ children }) => {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" />;
};

function App() {
  return (
    // Envuelve toda la app con el proveedor de autenticación
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: cualquiera puede ver el login */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Ruta protegida: solo usuarios logueados */}
          <Route path="/dashboard" element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          } />

          {/* Ruta protegida: solo usuarios logueados */}
          <Route path="/estudiantes" element={
            <RutaProtegida>
              <Estudiantes />
            </RutaProtegida>
          } />

          {/* Cualquier ruta no encontrada redirige al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;