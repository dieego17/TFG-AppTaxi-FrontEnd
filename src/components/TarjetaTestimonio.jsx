/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function TarjetaTestimonio({testimonios}) {
  return (
    <div className='row text-center justify-content-center'>
        {
            testimonios.map(testimonio => (
              <div className="card col-5 m-3" key={testimonio.id}>
                <div className="card-body">
                  <h5 className="card-title text-success">{testimonio.cliente.usuario.nombre} {testimonio.cliente.usuario.apellidos}</h5>
                  <p className="card-text">{testimonio.mensaje_testimonio}</p>
                  {
                    testimonio.clasificacion_testimonio == 4 ? 
                    <div className="text-center">
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star text-success"></i>
                    </div>
                    : testimonio.clasificacion_testimonio == 5 ?
                    <div className="text-center">
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                    </div>
                    : testimonio.clasificacion_testimonio == 4.5 ?
                    <div className="text-center">
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-fill text-success"></i>
                      <i className="bi bi-star-half text-success"></i>
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