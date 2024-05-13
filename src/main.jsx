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
import ProtectRoute from "./auth/ProtectRoute";
import AuthProvider from "./auth/AuthProvider";
import Cliente from "./components/Cliente/Cliente";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
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
        <Route path="/" element={<ProtectRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider> 
);


