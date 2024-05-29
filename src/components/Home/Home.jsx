/* eslint-disable no-unused-vars */
import React from "react";
import "./home.css";
import "./responsiveHome.css";
import tick from "../../assets/images/tick.png";
import coche from "../../assets/images/car.png";
import porcen from "../../assets/images/percent.png";
import tele from "../../assets/images/teleo.png";
import TarjetaTestimonio from "./TarjetaTestimonio";
import { useTestimonio } from "../../hooks/useTestimonio";
import chofer2 from "../../assets/images/chofer2.jpeg";
import chofer3 from "../../assets/images/chofer3.jpg";
import TarjetaServicios from "./TarjetaServicios";
import chofer from "../../assets/images/chofer.jpg";
import google from "../../assets/images/google.svg";
import home from "../../assets/images/home1.jpg";
import { Link } from "react-router-dom";


function Home() {
  // hook personalizado para coger los testimonios de los clientes
  const testimonios = useTestimonio();

  return (
    <main className="main">
      <div className="container__home">
        <div className="section__principal container">
          <article className="article__title">
            <h1 className="h1__title">Tu destino, nuestra misión. <br /> ¡Viaja sin límites con AppTaxio!</h1>
            <p className="p__title">Descubre la comodidad de solicitar un taxi con solo unos clics. ¡Seguridad, rapidez y comodidad en cada viaje!</p>
            <Link to={'/login'} className="link__login">
              Iniciar Sesión
            </Link>
          </article>
          <article className="article__img">
            <img className="img__home" src={home} alt="" />
          </article>
        </div>
      </div>
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
            <div className="brand-list">
              <div className="wrapper">
              <TarjetaTestimonio testimonios={testimonios} key={testimonios.id} />
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Home;
