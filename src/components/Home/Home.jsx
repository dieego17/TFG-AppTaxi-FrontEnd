/* eslint-disable no-unused-vars */
import React from "react";
import "./home.css";
import "./responsiveHome.css";
import tick from "../../assets/images/tick.png";
import coche from "../../assets/images/car.png";
import porcen from "../../assets/images/percent.png";
import tele from "../../assets/images/teleo.png";
import { Link } from "react-router-dom";
import TarjetaTestimonio from "./TarjetaTestimonio";
import { useTestimonio } from "../../hooks/useTestimonio";
import chofer2 from "../../assets/images/chofer2.jpeg";
import chofer3 from "../../assets/images/chofer3.jpg";
import TarjetaServicios from "./TarjetaServicios";
import chofer from "../../assets/images/chofer.jpg";
import google from "../../assets/images/google.svg";
import fondo2 from "../../assets/images/taxi__ia.jpeg";

function Home() {
  // hook personalizado para coger los testimonios de los clientes
  const testimonios = useTestimonio();

  return (
    <main className="main">
      <div className="section__preheader">
        <section className="section__postheader">
          <article className="article__img">
            <img className="img__fondo" src={fondo2} alt="" />
          </article>
          <article className="container__form">
            <h2 className="text-center h2__form">Viaja con nosotros</h2>
            <form action="">
              <div className="form-group form__destino">
                <label htmlFor="origen">Origen</label>
                <input
                  type="text"
                  className="form__control"
                  id="origen"
                  placeholder="Dirección, hotel..."
                />
                <i className="fa-solid fa-location-dot icono__destino"></i>
              </div>
              <div className="form-group form__destino">
                <label htmlFor="destino">Destino</label>
                <input
                  type="text"
                  className="form__control"
                  id="destino"
                  placeholder="Dirección, hotel..."
                />
                <i className="fa-solid fa-location-dot icono__destino"></i>
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input type="date" className="form__control" id="fecha" />
              </div>
              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  className="form__control"
                  id="hora"
                  value={"11:00"}
                />
              </div>
              <Link className="link__button" to="/servicios/ciudad-a-ciudad">
                <button type="submit" className="btn boton__form">
                  Buscar
                </button>
              </Link>
            </form>
          </article>
        </section>
      </div>
      <section className="formulario__pequeño">
        <h2 className="text-center h2__form">Viaja con nosotros</h2>
        <form action="" className="form__pequeño">
          <div className="form-group form__destino">
            <label htmlFor="origen">Origen</label>
            <input
              type="text"
              className="form__control"
              id="origen"
              placeholder="Dirección, hotel..."
            />
            <i className="fa-solid fa-location-dot icono__destino"></i>
          </div>
          <div className="form-group form__destino">
            <label htmlFor="destino">Destino</label>
            <input
              type="text"
              className="form__control"
              id="destino"
              placeholder="Dirección, hotel..."
            />
            <i className="fa-solid fa-location-dot icono__destino"></i>
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input type="date" className="form__control" id="fecha" />
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <input
              type="time"
              className="form__control"
              id="hora"
              value={"11:00"}
            />
          </div>
          <Link className="link__button" to="/servicios/ciudad-a-ciudad">
            <button type="submit" className="btn boton__form">
              Buscar
            </button>
          </Link>
        </form>
      </section>
      <section>
        <article className="container">
          <h2 className="text-center pt-5 supertitle__servicios">Nuestros Servicios</h2>
          <div className="row justify-content-center text-center container__servicios">
            <TarjetaServicios
              enlace={"servicios/ciudad-a-ciudad"}
              titulo={"Viajes de ciudad a ciudad"}
              imagen={chofer}
              texto={
                "Disfruta de nuestra app con un servicio sin problemas y extras como espacio adicional para equipaje."
              }
            />
            <TarjetaServicios
              enlace={"servicios/recogida-inmediata"}
              titulo={"Recogida inmediata"}
              imagen={chofer3}
              texto={
                "Viaja en taxi en menos de 10 minutos con nuestra recogida inmediata a través de la AppTaxio."
              }
            />
            <TarjetaServicios
              enlace={"servicios/viaje-por-horas"}
              titulo={"Alquiler por horas y día completo"}
              imagen={chofer2}
              texto={
                "Disfruta del máximo confort con coches de lujo y conductores profesionales."
              }
            />
          </div>
        </article>
      </section>
      <section>
        <article className="article__elegirnos">
          <div className="container p-5">
            <h2 className="text-center text-white pb-5">Porque elegirnos</h2>
            <div className="row justify-content-around">
              <div className="col-lg-2 col-md-6 text-center container__iconos--elegirnos">
                <img src={porcen} alt="" />
                <p className="text__elegirnos pt-4">Descuentos</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center container__iconos--elegirnos">
                <img src={coche} alt="" />
                <p className="text__elegirnos pt-4">Comodidad</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center container__iconos--elegirnos">
                <img src={tick} alt="" />
                <p className="text__elegirnos pt-4">Seguridad</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center container__iconos--elegirnos">
                <img src={tele} alt="" />
                <p className="text__elegirnos pt-4">Soporte Eficaz</p>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="container">
        <article className="row mt-4 mb-4">
          <div className="container__reseñas">
            <img className="svg__google" src={google} alt="" />
            <h2 className="title__reseñas">Google</h2>
            <i className="bi bi-star-fill estrellas__reseñas"></i>
            <i className="bi bi-star-fill estrellas__reseñas"></i>
            <i className="bi bi-star-fill estrellas__reseñas"></i>
            <i className="bi bi-star-fill estrellas__reseñas"></i>
            <i className="bi bi-star-half estrellas__reseñas"></i>
          </div>
          <div className="container__tarjetas--testimonios">
            <TarjetaTestimonio testimonios={testimonios} key={testimonios.id} />
          </div>
        </article>
      </section>
    </main>
  );
}

export default Home;
