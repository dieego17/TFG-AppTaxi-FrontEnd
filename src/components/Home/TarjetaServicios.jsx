/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import "./tarjetaServicios.css";

function TarjetaServicios({ imagen, titulo, texto, enlace }) {
  return (
     <div className="card col-lg-4 col-sm-12 tarjeta__servicios">
        <img src={imagen} className="card-img-top imagen__servicios" alt="chofer" /> 
        <div className="card-body texto__servicios">
            <h5 className="card-title title__servicios">{titulo}</h5>
            <p className="card-text">{texto}</p>
        </div>
        <Link to={enlace} className='boton__servicios'>
            <span className='span__button'>Más información</span>
        </Link>
     </div>
  )
}

export default TarjetaServicios