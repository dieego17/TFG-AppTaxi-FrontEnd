/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function InsertarGasto() {
    const [descripcionGastos, setDescripcionGastos] = useState('');
    const [importeGastos, setImporteGastos] = useState('');
    const [fechaGastos, setFechaGastos] = useState('');

    // ID del usuario logueado
    const [idTaxista, setIdTaxista] = useState('3');   

    // Estado para mostrar la Alerta de error
    const [showAlertError, setShowAlertError] = useState(false);

    // Estado para mostrar la Alerta de éxito
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const handleSubmitGastos = (e) => {
        e.preventDefault();

        // Verificar si algún campo está vacío
        if (!descripcionGastos || !fechaGastos || !importeGastos) {
            setShowAlertError(true); // Mostrar la alerta
            return;
        }else{
            // Si no hay campos vacíos, mostrar la alerta de éxito
            setShowAlertError(false);
            setShowAlertSuccess(true)
        }

        // Si todos los campos están completos, enviar los datos
        const data = {
            descripcion_gasto: descripcionGastos,
            gasto_total: importeGastos,
            id_taxista: idTaxista,
            fecha_gasto: fechaGastos
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:3000/appTaxio/v1/perdidas/3', requestOptions)
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
                <h2 className="section-title">Añadir Gastos</h2>
                <form className='formulario' onSubmit={handleSubmitGastos}>
                    <div className="form-group">
                        <label htmlFor="descripcionGastos">Descripción:</label>
                        <textarea className='input__form' id="descripcionGastos" value={descripcionGastos} onChange={(e) => setDescripcionGastos(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaGastos">Fecha:</label>
                        <input className='input__form' id="fechaGastos" value={fechaGastos} type='date' onChange={(e) => setFechaGastos(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="importeGastos">Importe total:</label>
                        <input className='input__form' id="importeGastos" type='number' value={importeGastos} onChange={(e) => setImporteGastos(e.target.value)} />
                    </div>
                    <button type="submit" className="btn">
                        Insertar
                    </button>
                </form>
            </div>
            <Link className="button__volver" to={'/dashboard/resumen-financiero/todos-gastos'}>
                Volver
            </Link>
        </div>
    );
}

export default InsertarGasto;
