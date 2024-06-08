/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./servicios.css";
import { useEffect } from "react";
import imgFondo from "../../assets/images/servicesPage.jpg";
import mapaMundo from "../../assets/images/mapaMundo.webp";
import ciudadCiudad from "../../assets/images/ciudad_ciudad.jpg";
import horasDias from "../../assets/images/horasDia.jpg";
import recogidainmediata from "../../assets/images/recogida_inmediata.jpg";

function Servicios() {

  const [showScrollButton, setShowScrollButton] = React.useState(false);

  // Mostrar botón de scroll cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY  > 100) { 
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Evento para hacer scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container__serviciosPage">
      <div className={`flecha__arriba ${showScrollButton ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fa-solid fa-arrow-up"></i>
      </div>
      <div className="container__fondo">
        <img className="img__fondoServicios" src={imgFondo} alt="" />
      </div>
      <div className="container">
        <h1 className="title__pageServicios">SERVICIOS</h1>
        <div className="container__serviciosApp">
          <div className="container__cardApp">
            <div className="container__textServicios">
              <h3 className="h2__serviciosApp">VIAJES DE CIUDAD A CIUDAD</h3>
              <p className="text__serviciosApp">
                Con AppTaxio, puedes ofrecer viajes de ciudad a ciudad a tus
                clientes, brindándoles un servicio de calidad y comodidad. Con
                nuestra aplicación, tus clientes siempre llegarán a su destino
                de manera segura y puntual.
              </p>
              <ul className="ul__cardServicios">
                <li className="list__cardServices">
                  <strong>Viajes de ciudad a ciudad:</strong> Traslados cómodos y seguros entre
                  diferentes ciudades.
                </li>
                <li className="list__cardServices">
                  <strong>Viajes a aeropuertos:</strong> Servicio de transporte confiable hacia y
                  desde los aeropuertos principales.
                </li>
                <li className="list__cardServices">
                  <strong>Viajes a estaciones de tren:</strong> Desplazamientos rápidos y
                  puntuales hacia las estaciones de tren.
                </li>
              </ul>
            </div>
            <img className="img__serviciosApp" src={ciudadCiudad} alt="" />
          </div>
          <div className="container__cardApp">
            <img className="img__serviciosApp" src={recogidainmediata} alt="" />
            <div className="container__textServicios">
              <h3 className="h2__serviciosApp">RECOGIDA INMEDIATA</h3>
              <p className="text__serviciosApp">
                Cuando necesite una forma segura de desplazarse por la ciudad,
                piense en el servicio de recogida inmediata en AppTaxio. Puede
                reservar el servicio de primera calidad que tan bien conoce y le
                complace para su recogida inmediata en las ciudades que se
                indican a continuación.
              </p>
              <ul className="ul__cardServicios">
                <li className="list__cardServices">
                  <strong>Recogida inmediata:</strong> Servicios rápidos para desplazamientos
                  urgentes.
                </li>
                <li className="list__cardServices">
                  <strong>Recogida en aeropuertos:</strong> Recogidas puntuales justo a la salida
                  de la terminal.
                </li>
                <li className="list__cardServices">
                  <strong>Recogida en estaciones de tren:</strong> Encuentro eficiente en la
                  entrada de las estaciones de tren.
                </li>
              </ul>
            </div>
          </div>
          <div className="container__cardApp">
            <div className="container__textServicios">
              <h3 className="h2__serviciosApp">
                ALQUILER POR HORAS Y DÍA COMPLETO
              </h3>
              <p className="text__serviciosApp">
                AppTaxio te permite estar disponible las 24 horas del día, los 7
                días de la semana. Con nuestra aplicación, nunca perderás una
                oportunidad de negocio.
              </p>
              <ul className="ul__cardServicios">
                <li className="list__cardServices">
                  <strong>Alquiler por horas:</strong> Flexibilidad para tus necesidades diarias,
                  alquila solo el tiempo que necesites.
                </li>
                <li className="list__cardServices">
                  <strong>Alquiler por día completo:</strong> Ideal para viajes de negocios o
                  turismo, alquila un vehículo todo el día.
                </li>
                <li className="list__cardServices">
                  <strong>Alquiler por días:</strong> Perfecto para viajes extendidos o visitas
                  prolongadas, alquila por varios días.
                </li>
              </ul>
            </div>
            <img className="img__serviciosApp" src={horasDias} alt="" />
          </div>
        </div>

        <div className="container__cardServices">
          <article>
            <div className="card__services">
              <p className="title__cardServices">
                <i className="fa-solid fa-hourglass-half"></i>
              </p>
              <h2 className="h2__cardServicios">AHORRA TIEMPO</h2>
              <p className="text__cardServices">
                Nuestra aplicación agiliza tus tareas diarias, permitiéndote
                gestionar tu negocio de manera más eficiente y dedicar más
                tiempo a lo que realmente importa.
              </p>
            </div>
          </article>
          <article>
            <div className="card__services">
              <p className="title__cardServices">
                <i className="fa-solid fa-money-bill-wave"></i>
              </p>
              <h2 className="h2__cardServicios">REDUCE TUS GASTOS</h2>
              <p className="text__cardServices">
                Optimizamos tus recursos para que puedas disminuir costos
                operativos. Con nuestras herramientas, maximizarás tus
                beneficios sin comprometer la calidad.
              </p>
            </div>
          </article>
          <article>
            <div className="card__services">
              <p className="title__cardServices">
                <i className="fa-solid fa-user-large"></i>
              </p>
              <h2 className="h2__cardServicios">FIABILIDAD</h2>
              <p className="text__cardServices">
                Nuestra tecnología avanzada te brinda un servicio confiable y
                seguro, asegurando que siempre estés disponible para tus
                clientes y mantengas la confianza en tu negocio.
              </p>
            </div>
          </article>
        </div>
      </div>
      <div className="container__mapaMundo container">
        <div className="container__textMapa">
          <h2 className="h2__mapaMundo">¿Por qué elegirnos?</h2>
          <p className="text__mapaMundo">
            En AppTaxio, ofrecemos la solución definitiva para taxistas. Nuestra
            aplicación no solo optimiza la eficiencia y organización diaria,
            sino que también permite a los conductores centrarse en brindar un
            servicio excepcional a sus clientes. Con AppTaxio, cada día es más
            sencillo y productivo.
          </p>
        </div>
        <div className="container__mapaImg">
          <img className="img__mapaMundo" src={mapaMundo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Servicios;
