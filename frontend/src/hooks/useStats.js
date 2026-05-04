import { useState, useEffect } from 'react';
import API from '../services/api';

// Hook que carga las estadísticas del dashboard:
// total de estudiantes, profesores y cursos en paralelo

const useStats = () => {
    const [stats, setStats] = useState({ estudiantes: 0, profesores: 0, cursos: 0 });

    useEffect(() => {
        const cargarStats = async () => {
            try {
                const [est, prof, cur] = await Promise.all([
                    API.get('/estudiantes'),
                    API.get('/profesores'),
                    API.get('/cursos'),
                ]);
                setStats({
                    estudiantes: Array.isArray(est.data.data) ? est.data.data.length : est.data.length,
                    profesores: Array.isArray(prof.data.data) ? prof.data.data.length : prof.data.length,
                    cursos: Array.isArray(cur.data.data) ? cur.data.data.length : cur.data.length,
                });
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
            }
        };
        cargarStats();
    }, []);

    return stats;
};

export default useStats;