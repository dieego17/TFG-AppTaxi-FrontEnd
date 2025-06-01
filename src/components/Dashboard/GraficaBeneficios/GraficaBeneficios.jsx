/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import "./grafica.css";

function GraficaBeneficios() {
  const [ganancias, setGanancias] = useState([]);
  const [perdidas, setPerdidas] = useState([]);
  const chartRef = useRef(null);
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;

  const token = localStorage.getItem("token");
  const idUsuario = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resGanancias, resPerdidas] = await Promise.all([
          fetch(`${ApiUrl}/ganancias/${idUsuario}`),
          fetch(`${ApiUrl}/perdidas/${idUsuario}`),
        ]);

        const dataGanancias = await resGanancias.json();
        const dataPerdidas = await resPerdidas.json();

        setGanancias(dataGanancias);
        setPerdidas(dataPerdidas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    const totalGanancias = ganancias.reduce(
      (total, g) => total + g.ganancia_total,
      0
    );
    const totalPerdidas = perdidas.reduce(
      (total, p) => total + p.gasto_total,
      0
    );
    const diferencia = totalGanancias - totalPerdidas;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Ganancias", "Pérdidas", "Beneficios"],
        datasets: [
          {
            label: "Euros (€)",
            data: [totalGanancias, totalPerdidas, diferencia],
            backgroundColor: [
              "rgba(60, 174, 163, 0.8)", // Mismo color que .button__ganancias
              "rgba(247, 108, 108, 0.8)", // Mismo color que .button__perdidas
              "rgba(33, 150, 243, 0.8)", // Beneficios: usa un tono similar o uno que te guste
            ],
            borderColor: [
              "rgba(60, 174, 163, 1)",
              "rgba(247, 108, 108, 1)",
              "rgba(33, 150, 243, 1)",
            ],
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: [
              "rgba(43, 140, 129, 0.9)", // .button__ganancias:hover
              "rgba(192, 85, 85, 0.9)", // .button__perdidas:hover
              "rgba(25, 118, 210, 0.9)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#333",
              font: {
                family: "Poppins, sans-serif",
                size: 14,
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            ticks: {
              color: "#333",
              font: {
                family: "Poppins, sans-serif",
                size: 14,
              },
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#333",
            bodyColor: "#333",
            borderColor: "#ccc",
            borderWidth: 1,
          },
          title: {
            display: true,
            text: "Resumen Financiero",
            color: "#1a3e3f",
            font: {
              family: "Poppins, sans-serif",
              size: 20,
              weight: "bold",
            },
            padding: { top: 10, bottom: 30 },
          },
        },
        animation: {
          duration: 1200,
          easing: "easeInOutQuart",
        },
      },
    });

    chartRef.current = chart;
  }, [ganancias, perdidas]);

  return (
    <div className="container__grafica">
      <div className="chart-container">
        <canvas id="myChart"></canvas>
      </div>
      <div className="link__container">
        <Link
          className="button__ganancias"
          to={"/dashboard/resumen-financiero/todas-ganancias"}
        >
          Ver todas las Ganancias
        </Link>
        <Link
          className="button__perdidas"
          to={"/dashboard/resumen-financiero/todos-gastos"}
        >
          Ver todos los Gastos
        </Link>
      </div>
    </div>
  );
}

export default GraficaBeneficios;
