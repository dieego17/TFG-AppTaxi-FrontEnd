/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import './grafica.css';
import { Link } from 'react-router-dom';
import textPopins from '../../../assets/font/Poppins-Regular.ttf';

function GraficaBeneficios() {
    const [ganancias, setGanancias] = useState([]);
    const [perdidas, setPerdidas] = useState([]);
    const chartRef = useRef(null);
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;

    const token = localStorage.getItem('token');
    const idUsuario = token ? JSON.parse(atob(token.split('.')[1])).id_usuario : '';

    useEffect(() => {
        const fetchData = async () => {
            const responseGanancias = await fetch(`${ApiUrl}/ganancias/${idUsuario}`);
            const responsePerdidas = await fetch(`${ApiUrl}/perdidas/${idUsuario}`);
            const dataGanancias = await responseGanancias.json();
            const dataPerdidas = await responsePerdidas.json();

            setGanancias(dataGanancias);
            setPerdidas(dataPerdidas);
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');

        // Suma los valores de ganancias y pérdidas para mostrarlos como una sola barra
        const totalGanancias = ganancias.reduce((total, ganancia) => total + ganancia.ganancia_total, 0);
        const totalPerdidas = perdidas.reduce((total, perdida) => total + perdida.gasto_total, 0);

        const gananciasData = [totalGanancias];
        const perdidasData = [totalPerdidas];
        const diferenciaData = [totalGanancias - totalPerdidas];

        const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ganancias - Pérdidas = Beneficios'],
                datasets: [
                    {
                        label: 'Ganancias',
                        data: gananciasData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Pérdidas',
                        data: perdidasData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Beneficios',
                        data: diferenciaData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                animation: {
                    duration: 1500,
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: textPopins, 
                            },
                        },
                    },
                },
            },
        });

        chartRef.current = newChart;
    }, [ganancias, perdidas]);

    return (
        <div className='container__grafica'>
            <div className="chart-container">
                <h2 className='h2__grafica'>Resumen Financiero</h2>
                <canvas id="myChart" width="600" height="400"></canvas>
            </div>
            <div className='link__container'>
                <Link className='link__text' to={'/dashboard/resumen-financiero/todas-ganancias'} >
                    Ver todas las Ganancias
                </Link>
                <Link className='link__text link__text--perdidas' to={'/dashboard/resumen-financiero/todos-gastos'} >
                    Ver todos los Gastos
                </Link>
            </div>
        </div>
    );
}

export default GraficaBeneficios;
