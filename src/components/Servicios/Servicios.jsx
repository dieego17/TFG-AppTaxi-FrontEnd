/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import './servicios.css'
import imgFondo from '../../assets/images/servicesPage.jpg'

function Servicios() {
  return (
    <div className='container__serviciosPage'>
      <div className='container__fondo'>
        <img className='img__fondoServicios' src={imgFondo} alt="" />
      </div>
      <div className='container'>
        <h1 className='title__pageServicios'>SERVICIOS</h1>
      </div>
    </div>
  )
}

export default Servicios