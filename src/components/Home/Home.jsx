/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./home.css";
import "./responsiveHome.css";
import tick from "../../assets/images/tick.png";
import coche from "../../assets/images/car.png";
import porcen from "../../assets/images/percent.png";
import tele from "../../assets/images/teleo.png";
import { Link } from "react-router-dom";
import TarjetaTestimonio from "./TarjetaTestimonio";
import { useTestimonio } from "../../hooks/useTestimonio";
import fondo from "../../assets/images/chofer5.webp";
import chofer2 from "../../assets/images/chofer2.jpeg";
import chofer3 from "../../assets/images/chofer3.jpg";
import taxi from "../../assets/images/taxi__header.png";
import TarjetaServicios from "./TarjetaServicios";
import chofer from "../../assets/images/chofer.jpg";

function Home() {
  // hook personalizado para coger los testimonios de los clientes
  const testimonios = useTestimonio();

  return (
    <main className="main">
      <div className="section__preheader">
        <section className="section__postheader">
          <article className="article__img">
            <img className="img__fondo" src={fondo} alt="" />
          </article>
          <article className="container__form">
            <h2 className="text-center">Viaja con nosotros</h2>
            <form action="">
              <div className="form-group">
                <label htmlFor="origen">Origen</label>
                <input
                  type="text"
                  className="form-control"
                  id="origen"
                  placeholder="Dirección, hotel..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="destino">Destino</label>
                <input
                  type="text"
                  className="form-control"
                  id="destino"
                  placeholder="Dirección, hotel..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input type="date" className="form-control" id="fecha" />
              </div>
              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  value={"11:00"}
                />
              </div>
              <Link className="link__button" to="/servicios/ciudad-a-ciudad">
                <button type="submit" className="btn btn-success boton__form">
                  Buscar
                </button>
              </Link>
            </form>
          </article>
        </section>
      </div>
      <section className="formulario__pequeño">
        <form action="">
          <div className="form-group">
            <label htmlFor="origen">Origen</label>
            <input
              type="text"
              className="form-control"
              id="origen"
              placeholder="Dirección, hotel..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="destino">Destino</label>
            <input
              type="text"
              className="form-control"
              id="destino"
              placeholder="Dirección, aeropuerto, hotel..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input type="date" className="form-control" id="fecha" />
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <input
              type="time"
              className="form-control"
              id="hora"
              value={"11:00"}
            />
          </div>
          <Link to="/servicios/ciudad-a-ciudad">
            <button type="submit" className="btn btn-success">
              Buscar
            </button>
          </Link>
        </form>
      </section>
      <section>
        <article className="container">
          <h2 className="text-center pt-5">Nuestros Servicios</h2>
          <div className="row justify-content-center text-center container__servicios">
            <TarjetaServicios
              enlace={"servicios/ciudad-a-ciudad"}
              titulo={"Viajes de ciudad a ciudad"}
              imagen={chofer}
              texto={
                "Despídase del estrés del transporte público y de la bienvenida a la comodidad y simplicidad de los viajes con nuestro servicio de transporte de ciudad a ciudad"
              }
            />
            <TarjetaServicios
              enlace={"servicios/recogida-inmediata"}
              titulo={"Recogida inmediata"}
              imagen={chofer3}
              texto={
                "Cuando necesite una forma segura de desplazarse por la ciudad, piense en el servicio de recogida inmediata de AppTaxio. Puede reservar el servicio de primera calidad que tan bien conoce y le complace para su recogida inmediata en las ciudades que se indican."
              }
            />
            <TarjetaServicios
              enlace={"servicios/viaje-por-horas"}
              titulo={"Alquiler por horas y día completo"}
              imagen={chofer2}
              texto={
                "Donde quiera que vayas, llega con estilo. Nuestro servicio por horas cubre para distancias de hasta 20 km por hora. Solo tienes que pensar cuántas horas vas a necesitar para llegar a tus diferentes destinos. Tienes total flexibilidad para ir donde quieras."
              }
            />
          </div>
        </article>
        <article className="p-3">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-lg-2 col-md-6 text-center">
                <p className="text__elegirnos pt-4">Descuentos</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <p className="text__elegirnos pt-4">Coche Rápido</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <p className="text__elegirnos pt-4">Coche Seguro</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <p className="text__elegirnos pt-4">Soporte Eficaz</p>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section>
        <article className="article__elegirnos">
          <div className="container p-5">
            <h2 className="text-center text-white">Porque elegirnos</h2>
            <div className="row justify-content-around">
              <div className="col-lg-2 col-md-6 text-center">
                <img src={porcen} alt="" />
                <p className="text__elegirnos pt-4">Descuentos</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={coche} alt="" />
                <p className="text__elegirnos pt-4">Coche Rápido</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={tick} alt="" />
                <p className="text__elegirnos pt-4">Coche Seguro</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={tele} alt="" />
                <p className="text__elegirnos pt-4">Soporte Eficaz</p>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="container">
        <article className="row mt-4 mb-4">
          <TarjetaTestimonio testimonios={testimonios} key={testimonios.id} />
        </article>
      </section>
    </main>
  );
}

export default Home;
