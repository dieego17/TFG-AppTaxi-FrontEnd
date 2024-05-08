/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './home.css'
import tick from '../../assets/images/tick.png';
import coche from '../../assets/images/car.png';
import porcen from '../../assets/images/percent.png';
import tele from '../../assets/images/teleo.png';
import { Link } from 'react-router-dom';
import TarjetaTestimonio from '../TarjetaTestimonio';
import { useTestimonio } from '../../hooks/useTestimonio'
import fondo from '../../assets/images/chofer5.webp'
import chofer from '../../assets/images/chofer.jpg'
import chofer2 from '../../assets/images/chofer2.jpeg'
import chofer3 from '../../assets/images/chofer3.jpg'
import taxi from '../../assets/images/taxi__header.png'

 

function Home() {

  // hook personalizado para coger los testimonios de los clientes
  const testimonios = useTestimonio()

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
      {/* <div className='section__preheader'>
        <section className='section__postheader'>
          <article className='article__img'>
            <img className='img__fondo' src={fondo} alt="" />
          </article>
        </section>
      </div> */}
      <section>
        <article className='container'>
          <p className='text-center pt-5'>Nuestros Servicios</p>
          <div className='row justify-content-center text-center'>
            <div className="card col-lg-4 col-sm-12">
              {/* <img src={chofer} className="card-img-top" alt="chofer" /> */}
              <div className="card-body">
                <h5 className="card-title">Viajes de ciudad a ciudad</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                <a href="#" className="btn btn-primary">Más información</a>
              </div>
            </div>
            <div className="card col-lg-4 col-sm-12">
              {/* <img src={chofer3} className="card-img-top" alt="chofer" /> */}
              <div className="card-body">
                <h5 className="card-title">Recogida inmediata</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                <a href="#" className="btn btn-primary">Más información</a>
              </div>
            </div>
            <div className="card col-lg-4 col-sm-12">
              {/* <img src={chofer2} className="card-img-top" alt="chofer" /> */}
              <div className="card-body">
                <h5 className="card-title">Alquiler por horas y día completo</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                <a href="#" className="btn btn-primary">Más información</a>
              </div>
            </div>
          </div>
        </article>
        <article className='p-3'>
          <div className='container'>
            <div className='row justify-content-around'>
              <div className="col-lg-2 col-md-6 text-center">
                <p className='text__elegirnos pt-4'>Descuentos</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <p className='text__elegirnos pt-4'>Coche Rápido</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <p className='text__elegirnos pt-4'>Coche Seguro</p>
              </div>
              <div className="col-lg-2 col-md-6 text-center">
                <p className='text__elegirnos pt-4'>Soporte Eficaz</p>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section>
        <article className='article__elegirnos'>
          <div className='container p-5'>
            <p className='text-center text-white'>Porque elegirnos</p>
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