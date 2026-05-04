// Badge que muestra el rol del usuario con color según tipo:
// admin = rojo, moderador = amarillo, usuario = verde

const BadgeRol = ({ rol }) => {
    const colores = {
        admin: 'bg-red-100 text-red-600',
        moderador: 'bg-yellow-100 text-yellow-600',
        usuario: 'bg-green-100 text-green-600',
    };

    return (
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colores[rol] || colores.usuario}`}>
            {rol}
        </span>
    );
};

export default BadgeRol;