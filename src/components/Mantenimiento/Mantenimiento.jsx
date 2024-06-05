/* eslint-disable no-unused-vars */
import React from 'react'
import './mantenimiento.css'
import mantenimiento from '../../assets/images/mantenimiento.jpeg'

function Mantenimiento() {
  return (
    <div className='container__mant'>
        <main className='container main__title'>
            <img className='img__mant' src={mantenimiento} alt="" />
            <h1 className='h1__title'>La página se encuentra en mantenimiento.</h1>
            <p className='p__text'>Por favor, vuelva a intentarlo más tarde.</p>
        </main>
    </div>
  )
}

export default Mantenimiento