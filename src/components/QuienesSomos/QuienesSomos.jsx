/* eslint-disable no-unused-vars */
import React from 'react'
import './quienesSomos.css'
import imgFondo from '../../assets/images/aboutUs.jpg'
import mision from '../../assets/images/mision.jpeg'

function QuienesSomos() {
  return (
    <div className='container__quienesSomos'>
      <div className='container__fondo'>
        <img className='img__fondo' src={imgFondo} alt="" />
        <div className='container__titleQuienes'>
          <h1 className='h1__titleQuienes'>Quiénes Somos</h1>
        </div>
      </div>
      <div className='container__informacionQuienes container'>
        <div className='container__textoInfo'>
          <h1 className='titleInfo__h1'>AppTaxio</h1>
          <h2 className='titleInfo__h1'>Construyendo Futuro</h2>
          <div className='container__textInfo'>
            <i className="fa-solid fa-bullseye icon__info"></i>
            <div className='container__textObj'>
              <h3 className='h3__titleInfo'>Nuestro Objetivo</h3>
              <p className='text__info'>Simplificar la gestión diaria de los taxistas, proporcionando una solución integral y eficiente que aborde aspectos como la generación de facturas, registro de gastos y ganancias, y la gestión de clientes.
              </p>
            </div>
          </div>
          <div className='container__textInfo'>
            <i className="fa-solid fa-rocket icon__info"></i>
            <div className='container__textObj'>
              <h3 className='h3__titleInfo'>Nuestra Misión</h3>
              <p className='text__info'>Mejorar la experiencia laboral de los taxistas mediante una solución completa y eficiente, que simplifique tareas administrativas, permitiéndoles enfocarse en brindar un servicio excepcional.</p>
            </div>
          </div>
        </div>
        <div className='container__imagenInfo'>
          <img className='img__info' src={mision} alt="" />
        </div>
      </div>
      <div className='container__mapaubicancion container'>
        <h1 className='h1__contacto'>CONTACTO</h1>
        <p className='text__contacto'><i className="fa-solid fa-phone"></i> +34 925 999 999</p>
        <p className='text__contacto'><i className="fa-solid fa-envelope"></i> contactoapptaxio@gmail.com</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6115.738940262057!2d-4.824708724495213!3d39.96667098290938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd401bf76cbc2e51%3A0xf4fc06fbb47dff13!2sAv.%20Juan%20Carlos%20I%2C%2045600%20Talavera%20de%20la%20Reina%2C%20Toledo!5e0!3m2!1ses!2ses!4v1717666364342!5m2!1ses!2ses"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación"
          className='mapa__ubicacion'
        ></iframe>
      </div>
    </div>
  )
}

export default QuienesSomos