/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";
import QuienesSomos from "./components/QuienesSomos";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import RecogidaInmedia from "./components/RecogidaInmediata/RecogidaInmedia";
import CiudadaCiudad from "./components/CiudadaCiudad/CiudadaCiudad";
import ViajeHoras from "./components/ViajeHoras/ViajeHoras";
import Cliente from "./components/Cliente/Cliente";
import AllClientes from "./components/Dashboard/AllClientes/AllClientes";
import GraficaBeneficios from "./components/Dashboard/GraficaBeneficios/GraficaBeneficios";
import ReservaDetalle from "./components/Dashboard/AllClientes/ClienteDetalle/ReservaDetalle/ReservaDetalle";
import ViajeDetalle from "./components/Dashboard/AllClientes/ClienteDetalle/ViajeDetalle/ViajeDetalle";
import EditarPerfiil from "./components/Dashboard/EditarPerfil/EditarPerfiil";
import AllGanancias from "./components/Dashboard/GraficaBeneficios/AllGanancias/AllGanancias";
import AllGastos from "./components/Dashboard/GraficaBeneficios/AllGastos/AllGastos";
import InsertarGanancias from "./components/Dashboard/GraficaBeneficios/AllGanancias/InsertarGanancia/InsertarGanancia";
import InsertarGasto from "./components/Dashboard/GraficaBeneficios/AllGastos/InsertarGasto/InsertarGasto";
import MisReservas from "./components/Cliente/MisReservas/MisReservas";
import MisViajes from "./components/Cliente/MisViajes/MisViajes";
import DetalleViaje from "./components/Cliente/MisViajes/DetallesViaje/DetalleViaje";
import Reseña from "./components/Cliente/Reseña/Reseña";
import RutaMapa from "./components/Dashboard/AllClientes/ClienteDetalle/ViajeDetalle/RutaMapa/RutaMapa";
import ReservarViaje from "./components/Cliente/ReservarViaje/ReservarViaje";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />

          <Route
            path="/servicios/recogida-inmediata"
            element={<RecogidaInmedia />}
          />
          <Route
            path="/servicios/ciudad-a-ciudad"
            element={<CiudadaCiudad />}
          />
          <Route path="/servicios/viaje-por-horas" element={<ViajeHoras />} />

        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          {/* Ruta clientes */}
          <Route path="/cliente" element={<Cliente />} >
            <Route path="/cliente/nuevo-viaje" element={<ReservarViaje />} />
            <Route path="/cliente/mis-reservas" element={<MisReservas />} />
            <Route path="/cliente/mis-viajes" element={<MisViajes/>} />
            <Route path="/cliente/mis-viajes/detalles/:id" element={<DetalleViaje/>} />
            <Route path="/cliente/crear-reseña" element={<Reseña />} />
          </Route>

          {/* Ruta dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>

            <Route path="/dashboard/clientes" element={<AllClientes />} />
            <Route path="/dashboard/clientes/reservas-detalle/:id" element={<ReservaDetalle />} />
            <Route path="/dashboard/clientes/viajes-detalle/:id" element={<ViajeDetalle />} />
            <Route path="/dashboard/clientes/viajes-detalles/ruta/:id" element={<RutaMapa />} />
          

            <Route path="/dashboard/editar-perfil" element={<EditarPerfiil />} />

            <Route path="/dashboard/resumen-financiero" element={<GraficaBeneficios />} />
            <Route path="/dashboard/resumen-financiero/todas-ganancias" element={<AllGanancias />} />
            <Route path="/dashboard/resumen-financiero/añadir-ganancia" element={<InsertarGanancias />} />
            <Route path="/dashboard/resumen-financiero/añadir-gasto" element={<InsertarGasto />} />
            <Route path="/dashboard/resumen-financiero/todos-gastos" element={<AllGastos />} />
          </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  
);

 

