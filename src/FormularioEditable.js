import React, { useState, useEffect } from 'react';

const FormularioEditable = ({ datosIniciales, onSave }) => {
    const [datosEditables, setDatosEditables] = useState({});

    useEffect(() => {
        // Copia los datos iniciales en el estado de datos editables al cargar el componente
        setDatosEditables(datosIniciales);
    }, [datosIniciales]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Actualiza el estado de datos editables con el nuevo valor del input
        setDatosEditables({ ...datosEditables, [name]: value });
    };

    const handleGuardar = () => {
        // Llama a la función onSave con el objeto de datos editables al hacer clic en "Guardar"
        onSave(datosEditables);
    };

    return (
        <div>
            <h2>Formulario Editable</h2>
            <form>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={datosEditables.nombre || ''}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Edad:
                    <input
                        type="number"
                        name="edad"
                        value={datosEditables.edad || ''}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={datosEditables.email || ''}
                        onChange={handleChange}
                    />
                </label>
            </form>
            <button onClick={handleGuardar}>Guardar</button>
        </div>
    );
};

export default FormularioEditable;
