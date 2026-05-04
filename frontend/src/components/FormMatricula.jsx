const FormMatricula = ({ form, editandoId, estudiantes, asignaturas, handleChange, handleSubmit, cancelarEdicion }) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {editandoId ? 'Editar Matrícula' : 'Nueva Matrícula'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <select
                    name="id_estudiante"
                    value={form.id_estudiante}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Seleccionar Estudiante</option>
                    {estudiantes.map((e) => (
                        <option key={e.id_estudiante} value={e.id_estudiante}>
                            {e.nombre} {e.apellido}
                        </option>
                    ))}
                </select>

                <select
                    name="id_asignatura"
                    value={form.id_asignatura}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Seleccionar Asignatura</option>
                    {asignaturas.map((a) => (
                        <option key={a.id_asignatura} value={a.id_asignatura}>
                            {a.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="nota"
                    value={form.nota}
                    onChange={handleChange}
                    placeholder="Nota (opcional)"
                    min="0"
                    max="10"
                    step="0.1"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <div className="md:col-span-2 flex gap-3">
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                        {editandoId ? 'Actualizar' : 'Guardar'}
                    </button>
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

export default FormMatricula;