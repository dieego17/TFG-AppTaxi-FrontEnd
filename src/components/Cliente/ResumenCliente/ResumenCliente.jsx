/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./resumenCliente.css";
import { Link } from "react-router-dom";
import aeropuerto from "../../../assets/images/aeropuerto.jpeg";
import foto24 from "../../../assets/images/24.jpeg";
import newRutas from "../../../assets/images/rutasNew.jpeg";
import payApp from "../../../assets/images/payApp.jpeg";
import discount from "../../../assets/images/discount.png";

function ResumenCliente({ mostrar }) {
  if (!mostrar) {
    return null;
  }

  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const { nombre = "", apellidos = "" } = userInfo;

  return (
    <div className="container__resumenCliente container">
      <section className="section__inicioCliente">
        <h1 className="h1__inicioCliente">
          ¡Bienvenido, {nombre} {apellidos}!👋
        </h1>
        <p className="text__inicioCliente">Descubre nuestras últimas novedades</p>
      </section>

      <section className="section__promociones">
        <h2 className="h2__promociones">Promociones y Recomendaciones</h2>
        <div className="container__tarjetaPromociones">
            <div className="card">
                <img src={discount} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title card__titlePro">Viaja gratis después de 5 viajes</h5>
                </div>
            </div>
            <div className="card">
                <img src={aeropuerto} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title card__titlePro">Reserva un taxi para tu viaje al aeropuerto</h5>
                </div>
            </div>
        </div>
      </section>

      <section className="container__recomendaciones">
        <h2 className="h2__noticias">Noticias y Actualizaciones</h2>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={newRutas} className="img-fluid rounded-start" alt="Nuevas Rutas Disponibles" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title card__titleTarjeta">¡Nuevas Rutas Disponibles!</h5>
                <p className="card-text card__textTarjeta">
                  Estamos emocionados de anunciar nuevas rutas para tu conveniencia.
                  Ahora puedes viajar a más destinos con la misma confianza y comodidad.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title card__titleTarjeta">Servicio al Cliente 24/7</h5>
                <p className="card-text card__textTarjeta">
                  Nuestro equipo de atención al cliente está disponible las 24 horas del día,
                  los 7 días de la semana para ayudarte con cualquier pregunta o inquietud que puedas tener.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <img src={foto24} className="img-fluid rounded-end" alt="Servicio al Cliente 24/7" />
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={payApp} className="img-fluid rounded-start" alt="Próximamente: Pagos mediante la App" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title card__titleTarjeta">Próximamente: Pagos mediante la App</h5>
                <p className="card-text card__textTarjeta">
                  Pronto podrás realizar tus pagos directamente a través de nuestra app.
                  Esta nueva funcionalidad hará que tu experiencia sea aún más fluida y segura.
                  ¡Mantente atento a las próximas actualizaciones!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResumenCliente;
