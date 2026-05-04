// Formulario para crear o editar un estudiante
// Recibe: form, editandoId, handleChange, handleSubmit, cancelarEdicion

const campos = [
    { name: 'nombre', placeholder: 'Nombre' },
    { name: 'apellido', placeholder: 'Apellido' },
    { name: 'dni', placeholder: 'DNI' },
    { name: 'telefono', placeholder: 'Teléfono' },
    { name: 'direccion', placeholder: 'Dirección' },
    { name: 'poblacion', placeholder: 'Población' },
    { name: 'id_postal', placeholder: 'Código Postal' },
];

const FormEstudiante = ({ form, editandoId, handleChange, handleSubmit, cancelarEdicion }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {editandoId ? 'Editar Estudiante' : 'Nuevo Estudiante'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Inputs de texto generados dinámicamente */}
                {campos.map((campo) => (
                    <input
                        key={campo.name}
                        name={campo.name}
                        value={form[campo.name]}
                        onChange={handleChange}
                        placeholder={campo.placeholder}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}

                {/* Input de fecha separado por el type="date" */}
                <input
                    type="date"
                    name="fecha_nac"
                    value={form.fecha_nac}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="md:col-span-2 flex gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                        {editandoId ? 'Actualizar' : 'Guardar'}
                    </button>

                    {/* Botón cancelar: solo aparece en modo editar */}
                    {editandoId && (
                        <button
                            type="button"
                            onClick={cancelarEdicion}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormEstudiante;