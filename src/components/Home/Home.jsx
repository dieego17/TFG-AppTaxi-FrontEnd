/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './home.css'
import taxi from '../../assets/images/taxi__header.png';
import tick from '../../assets/images/tick.png';
import coche from '../../assets/images/car.png';
import porcen from '../../assets/images/percent.png';
import tele from '../../assets/images/teleo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TarjetaTestimonio from '../TarjetaTestimonio';

 

function Home() {

  const [testimonios, setTestimonios] = useState([])

  const getTestimonios = async () => {
    const response = await fetch('http://localhost:3000/appTaxi/v1/testimonios')
    const data = await response.json()
    /* console.log(data) */
    setTestimonios(data)
  }

  useEffect(() => { 
    getTestimonios()
  }, [])



  return (
    <main className='main'>
      <div className='section__preheader'>
        <section className='container'>
          <div className='row justify-content-center text-center align-items-center'>
            <article className='col-xl-6 col-md-6 col-sm-12'>
              <h1 className='article__h1'>El viaje de tu vida</h1>
              <p className='article__text'>Prueba</p>
              <Link to={'/login'} className='article__button'>
                Iniciar sesión
              </Link>
            </article>
            <article className='col-xl-6 col-md-6 col-sm-12'>
              <img className='img__taxi' src={taxi} alt="" />
            </article>
          </div>
        </section>
        {/* <img className='img__fondo' src={fondo} alt="" /> */}
      </div>
      <section>
        <article className='container'>
          <p className='text-center'>Porque elegirnos</p>
        </article>
        <article className='p-5 article__elegirnos'>
          <div className='container'>
            <div className='row justify-content-around'>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={porcen} alt="" />
                <p className='text__elegirnos pt-4'>Descuentos</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={coche} alt="" />
                <p className='text__elegirnos pt-4'>Coche Rápido</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={tick} alt="" />
                <p className='text__elegirnos pt-4'>Coche Seguro</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <img src={tele} alt="" />
                <p className='text__elegirnos pt-4'>Soporte Eficaz</p>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className='container'>
        <article className='row mt-4 mb-4'>
          <TarjetaTestimonio testimonios={testimonios} key={testimonios.id} />
        </article>
      </section>
    </main>
  )
}

export default Home