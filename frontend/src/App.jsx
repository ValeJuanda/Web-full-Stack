import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RutaProtegida from './components/RutaProtegida';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Estudiantes from './pages/Estudiantes';
import Profesores from './pages/Profesores';
import Registro from './pages/Registro';
import Cursos from './pages/Cursos';
import Aulas from './pages/Aulas';
import Asignaturas from './pages/Asignaturas';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <RutaProtegida><Dashboard /></RutaProtegida>
          } />
          <Route path="/estudiantes" element={
            <RutaProtegida><Estudiantes /></RutaProtegida>
          } />
          <Route path="/profesores" element={
            <RutaProtegida><Profesores /></RutaProtegida>
          } />
          <Route path="/cursos" element={
            <RutaProtegida>
              <Cursos />
            </RutaProtegida>
          } />
          <Route path="/aulas" element={
            <RutaProtegida>
              <Aulas />
            </RutaProtegida>
          } />
          <Route path="/asignaturas" element={
            <RutaProtegida>
              <Asignaturas />
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