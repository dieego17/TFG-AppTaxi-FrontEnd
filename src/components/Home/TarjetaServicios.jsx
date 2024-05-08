/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

function TarjetaServicios({ imagen, titulo, texto, enlace }) {
  return (
    <div className="card col-lg-4 col-sm-12">
        <img src={imagen} className="card-img-top" alt="chofer" /> 
        <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{texto}</p>
            <Link to={enlace} className='btn btn-success'>
                Más información
            </Link>
        </div>
     </div>
  )
}

export default TarjetaServicios