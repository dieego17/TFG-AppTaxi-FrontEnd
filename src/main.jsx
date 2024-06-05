/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BackendErrorProvider } from './auth/useBackEndErrorContext';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import QuienesSomos from './components/QuienesSomos/QuienesSomos';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import RegisterTaxista from './components/Register/RegisterTaxista';
import RegisterCliente from './components/Register/RegisterCliente';
import Servicios from './components/Servicios/Servicios';
import Cliente from './components/Cliente/Cliente';
import AllClientes from './components/Dashboard/AllClientes/AllClientes';
import GraficaBeneficios from './components/Dashboard/GraficaBeneficios/GraficaBeneficios';
import ReservaDetalle from './components/Dashboard/AllClientes/ClienteDetalle/ReservaDetalle/ReservaDetalle';
import ViajeDetalle from './components/Dashboard/AllClientes/ClienteDetalle/ViajeDetalle/ViajeDetalle';
import AllGanancias from './components/Dashboard/GraficaBeneficios/AllGanancias/AllGanancias';
import AllGastos from './components/Dashboard/GraficaBeneficios/AllGastos/AllGastos';
import InsertarGanancias from './components/Dashboard/GraficaBeneficios/AllGanancias/InsertarGanancia/InsertarGanancia';
import InsertarGasto from './components/Dashboard/GraficaBeneficios/AllGastos/InsertarGasto/InsertarGasto';
import MisReservas from './components/Cliente/MisReservas/MisReservas';
import MisViajes from './components/Cliente/MisViajes/MisViajes';
import DetalleViaje from './components/Cliente/MisViajes/DetallesViaje/DetalleViaje';
import Reseña from './components/Cliente/Reseña/Reseña';
import RutaMapa from './components/Dashboard/AllClientes/ClienteDetalle/ViajeDetalle/RutaMapa/RutaMapa';
import ReservarViaje from './components/Cliente/ReservarViaje/ReservarViaje';
import CrearFactura from './components/Dashboard/CrearFactura/CrearFactura';
import PrivateRoute from './auth/PrivateRoute';
import CambiarContraseña from './components/Login/CambiarContraseña/CambiarContraseña';
import Mantenimiento from './components/Mantenimiento/Mantenimiento';


createRoot(document.getElementById('root')).render(
  <BackendErrorProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/servicios" element={<Servicios />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/login/cambiar-contraseña" element={<CambiarContraseña />} />
        <Route path="/register-taxista" element={<RegisterTaxista />} />
        <Route path="/register-cliente" element={<RegisterCliente />} />

        {/* Ruta clientes */}
        <Route path="/cliente" element={<PrivateRoute roles={['cliente']} />}>
          <Route path="" element={<Cliente />}>
            <Route path="nuevo-viaje" element={<ReservarViaje />} />
            <Route path="mis-reservas" element={<MisReservas />} />
            <Route path="mis-viajes" element={<MisViajes />} />
            <Route path="mis-viajes/detalles/:id" element={<DetalleViaje />} />
            <Route path="crear-reseña" element={<Reseña />} />
          </Route>
        </Route>

        {/* Ruta dashboard */}
        <Route path="/dashboard" element={<PrivateRoute roles={['admin']} />}>
          <Route path="" element={<Dashboard />}>
            <Route path="clientes" element={<AllClientes />} />
            <Route path="clientes/reservas-detalle/:id" element={<ReservaDetalle />} />
            <Route path="clientes/viajes-detalle/:id" element={<ViajeDetalle />} />
            <Route path="clientes/viajes-detalles/ruta/:id" element={<RutaMapa />} />
            <Route path="crear-factura" element={<CrearFactura />} />
            <Route path="resumen-financiero" element={<GraficaBeneficios />} />
            <Route path="resumen-financiero/todas-ganancias" element={<AllGanancias />} />
            <Route path="resumen-financiero/añadir-ganancia" element={<InsertarGanancias />} />
            <Route path="resumen-financiero/añadir-gasto" element={<InsertarGasto />} />
            <Route path="resumen-financiero/todos-gastos" element={<AllGastos />} />
          </Route>
        </Route>

        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </BackendErrorProvider>
);
