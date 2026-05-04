// Tarjeta de estadística del dashboard
// Recibe: valor (número), label (texto), color (clase tailwind del número)

const StatCard = ({ valor, label, color }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className={`text-4xl font-bold ${color}`}>{valor}</p>
            <p className="text-gray-500 mt-1">{label}</p>
        </div>
    );
};

export default StatCard;