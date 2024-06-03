/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function TarjetaTestimonio({testimonios}) {
  return (
    <div className=' text-center justify-content-center container__reseñas'>
        {
            testimonios.map(testimonio => (
              <div className="card tarjeta__reseña col-5 m-3" key={testimonio.id_testimonio}>
                <div className="card-body">
                  <h5 className="card-title text-success nombre__reseñas">{testimonio.cliente.usuario.nombre} {testimonio.cliente.usuario.apellidos}</h5>
                  <p className="card-text nombre__reseñas">{testimonio.mensaje_testimonio}</p>
                  {
                    testimonio.clasificacion_testimonio == 4 || testimonio.clasificacion_testimonio < 4.5 ? 
                    <div className="text-center">
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star estrellas__opiniones"></i>
                    </div>
                    : testimonio.clasificacion_testimonio == 5 || testimonio.clasificacion_testimonio > 4.5 ?
                    <div className="text-center">
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                    </div>
                    : testimonio.clasificacion_testimonio == 4.5 ?
                    <div className="text-center">
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-fill estrellas__opiniones"></i>
                      <i className="bi bi-star-half estrellas__opiniones"></i>
                    </div>
                    : null
                  }
                </div>
              </div>
            ))
          }
    </div>
  )
}

export default TarjetaTestimonio