import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import './index.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// Importa provedor de autenticación
import { AuthProvider } from './context/AuthContext'
// Import de pagina app
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Estudiantes from './pages/Estudiantes'

//Ruta prottegida
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/login" />
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
          <Route path="/estudiantes" element={
            <PrivateRoute>
              <Estudiantes />
            </PrivateRoute>} />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App
