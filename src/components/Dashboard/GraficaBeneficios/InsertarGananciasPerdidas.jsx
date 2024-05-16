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
        fetch('http://localhost:3000/appTaxio/v1/ganancias/3', requestOptions)
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
            <h1>Insertar Ganancias y Pérdidas</h1>
            <h2>Ganancias:</h2>
            <form className='d-flex flex-column formulario' onSubmit={handleSubmitGanancias}>
                <label>
                    Descripción:
                    <textarea className='input__form' value={descripcionGanancias} onChange={(e) => setDescripcionGanancias(e.target.value)}></textarea>
                </label>
                <label>
                    Importe total:
                    <input className='input__form' type='number' value={importeGanancias} onChange={(e) => setImporteGanancias(e.target.value)} />
                </label>
                <button type="submit">
                    Insertar
                </button>
            </form>
            <h2>Gastos:</h2>
            <form className='d-flex flex-column formulario' onSubmit={handleSubmitGastos}>
                <label>
                    Descripción:
                    <textarea className='input__form' value={descripcionGastos} onChange={(e) => setDescripcionGastos(e.target.value)}></textarea>
                </label>
                <label>
                    Importe total:
                    <input className='input__form' type='number' value={importeGastos} onChange={(e) => setImporteGastos(e.target.value)} />
                </label>
                <button type="submit">
                    Insertar
                </button>
            </form>
        </div>
    );
}

export default InsertarGananciasPerdidas;
