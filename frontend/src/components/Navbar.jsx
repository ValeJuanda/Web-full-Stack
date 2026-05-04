// Barra de navegación superior reutilizable
// Recibe: titulo (string), y children para los botones de la derecha

const Navbar = ({ titulo, children }) => {
    return (
        <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
            <h1 className="text-xl font-bold">{titulo}</h1>
            <div className="flex gap-2">
                {children}
            </div>
        </nav>
    );
};

export default Navbar;