/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function InsertarGanancias() {
    const [descripcionGanancias, setDescripcionGanancias] = useState('');
    const [importeGanancias, setImporteGanancias] = useState('');
    const [fechaGanancia, setFechaGanancia] = useState('');

    // ID del usuario logueado
    const token = localStorage.getItem('token');
    const idTaxista = token ? JSON.parse(atob(token.split('.')[1])).id_usuario : '';  

    // Estado para mostrar la Alerta de error
    const [showAlertError, setShowAlertError] = useState(false);

    // Estado para mostrar la Alerta de éxito
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const handleSubmitGanancias = (e) => {
        e.preventDefault();

        // Verificar si algún campo está vacío
        if (!descripcionGanancias || !fechaGanancia || !importeGanancias) {
            setShowAlertError(true); // Mostrar la alerta de error
            return;
        }else{
            // Si no hay campos vacíos, mostrar la alerta de éxito
            setShowAlertError(false);
            setShowAlertSuccess(true)
        }

        // Si todos los campos están completos, enviar los datos
        const data = {
            descripcion_ganancia: descripcionGanancias,
            ganancia_total: importeGanancias,
            id_taxista: idTaxista,
            fecha_ganancia: fechaGanancia
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(`${ApiUrl}/ganancias/3`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('error', error));
    };

    return (
        <div className='container'>
            {
                // Mostrar alerta de error
                showAlertError && (
                    <div className="alert alert-danger alert__insert" role="alert">
                        Por favor, completa todos los campos.
                    </div>
                )
            }
            {
                // Mostrar alerta de éxito
                showAlertSuccess && (
                    <div className="alert alert-success alert__insert" role="alert">
                        Gasto insertado correctamente.
                    </div>
                )
            }
            <div className="section">
                <h2 className="section-title">Añadir Ganancias</h2>
                <form className='formulario' onSubmit={handleSubmitGanancias}>
                    <div className="form-group">
                        <label htmlFor="descripcionGanancias">Descripción:</label>
                        <textarea className='input__form' id="descripcionGanancias" value={descripcionGanancias} onChange={(e) => setDescripcionGanancias(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaGastos">Fecha:</label>
                        <input className='input__form' id="fechaGastos" value={fechaGanancia} type='date' onChange={(e) => setFechaGanancia(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="importeGanancias">Importe total:</label>
                        <input className='input__form' id="importeGanancias" type='number' value={importeGanancias} onChange={(e) => setImporteGanancias(e.target.value)} />
                    </div>
                    <button type="submit" className="btn">
                        Insertar
                    </button>
                </form>
            </div>
            <Link className="button__volver" to={'/dashboard/resumen-financiero/todas-ganancias'}>
                Volver
            </Link>
        </div>
    );
}

export default InsertarGanancias;
