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
import InsertarGananciasPerdidas from "./components/Dashboard/GraficaBeneficios/InsertarGananciasPerdidas";
import ReservaDetalle from "./components/Dashboard/AllClientes/ClienteDetalle/ReservaDetalle/ReservaDetalle";
import ViajeDetalle from "./components/Dashboard/AllClientes/ClienteDetalle/ViajeDetalle/ViajeDetalle";
 /* import ProtectRoute from "./auth/ProtectRoute";
import AuthProvider from "./auth/AuthProvider"; */

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
        <Route path="/cliente" element={<Cliente />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/clientes" element={<AllClientes />} />
            <Route path="/dashboard/clientes/reservas-detalle/:id" element={<ReservaDetalle />} />
            <Route path="/dashboard/clientes/viajes-detalle/:id" element={<ViajeDetalle />} />
            <Route path="/dashboard/resumen-beneficios" element={<GraficaBeneficios />} />
            <Route path="/dashboard/insertar-ganancias-perdidas" element={<InsertarGananciasPerdidas />} />
          </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  
);

{/* <AuthProvider>
    <Route path="/" element={<ProtectRoute />}>
          
      </Route>
  </AuthProvider>  */}

 

