import axios from 'axios';

// URL base del backend
const API = axios.create({
  baseURL: 'http://localhost:3001/api', // Cambia esto si tu backend está en otra URL
});

// Agregar Token JWT Peticion ATuomática
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
