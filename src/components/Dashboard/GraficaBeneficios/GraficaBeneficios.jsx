/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';


function GraficaBeneficios() {
    const [ganancias, setGanancias] = useState([]);
    const [perdidas, setPerdidas] = useState([]);
    const chartRef = useRef(null);
    const ApiUrl = import.meta.env.VITE_REACT_URL_API

  useEffect(() => {
    const fetchData = async () => {
        const responseGanancias = await fetch(`${ApiUrl}/ganancias/3`);
        const responsePerdidas = await fetch(`${ApiUrl}/perdidas/3`);
        const dataGanancias = await responseGanancias.json();
        const dataPerdidas = await responsePerdidas.json();
        
        setGanancias(dataGanancias);
        setPerdidas(dataPerdidas);
    };

    fetchData();
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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Pérdidas',
            data: perdidasData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Beneficios',
            data: diferenciaData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    chartRef.current = newChart;
  }, [ganancias, perdidas]);
  return (
    <div>
        <h1>Gráficas de Ganancias, Pérdidas y Beneficios</h1>
        <canvas id="myChart" width="200" height="50"></canvas>
        <Link to={'/dashboard'}>
          Volver
      </Link>
    </div>
  )
}

export default GraficaBeneficios