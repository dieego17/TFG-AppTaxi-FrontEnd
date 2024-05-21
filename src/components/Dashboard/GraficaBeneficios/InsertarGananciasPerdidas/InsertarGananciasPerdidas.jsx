/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './insertar.css';

function InsertarGananciasPerdidas() {
    const [descripcionGanancias, setDescripcionGanancias] = useState('');
    const [importeGanancias, setImporteGanancias] = useState('');
    const [descripcionGastos, setDescripcionGastos] = useState('');
    const [importeGastos, setImporteGastos] = useState('');
    const [idTaxista, setIdTaxista] = useState('3'); // Aquí id del taxista logueado, por ahora lo dejo en 3   

    const ApiUrl = import.meta.env.VITE_REACT_URL_API
    const handleSubmitGanancias = (e) => {
        e.preventDefault();
        const data = {
            descripcion_ganancia: descripcionGanancias,
            ganancia_total: importeGanancias,
            id_taxista: idTaxista
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

    const handleSubmitGastos = (e) => {
        e.preventDefault();
        const data = {
            descripcion_gasto: descripcionGastos,
            gasto_total: importeGastos,
            id_taxista: idTaxista
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
            <div className="section">
                <h2 className="section-title">Añadir Ganancias</h2>
                <form className='formulario' onSubmit={handleSubmitGanancias}>
                    <div className="form-group">
                        <label htmlFor="descripcionGanancias">Descripción:</label>
                        <textarea className='input__form' id="descripcionGanancias" value={descripcionGanancias} onChange={(e) => setDescripcionGanancias(e.target.value)}></textarea>
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
            <div className="section">
                <h2 className="section-title">Añadir Gastos</h2>
                <form className='formulario' onSubmit={handleSubmitGastos}>
                    <div className="form-group">
                        <label htmlFor="descripcionGastos">Descripción:</label>
                        <textarea className='input__form' id="descripcionGastos" value={descripcionGastos} onChange={(e) => setDescripcionGastos(e.target.value)}></textarea>
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
        </div>
    );
}

export default InsertarGananciasPerdidas;
