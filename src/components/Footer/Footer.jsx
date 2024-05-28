/* eslint-disable no-unused-vars */
import React from 'react'
import './footer.css'
import './responsiveFooter.css'
import logo from '../../assets/images/logoBlanco.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer'>
      <section className='container t-4'>
        <article className='article__lista row text-left'>
            <div className='col-lg-3 col-sm-12 mt-3'>
              <img className='logo__footer' src={logo} alt="" />
              <p className='text__resumen'>
                AppTaxio es una plataforma que conecta a pasajeros con conductores de taxi. 
                Nuestro objetivo es ofrecer un servicio de calidad y seguro a todos nuestros usuarios.
              </p>
            </div>
            <div className='col-lg-3 col-sm-12 container__enlaces'>
              <h3 className='h3__footer'>Enlaces útiles</h3>
              <ul className='p-0'>
                <li className='list__footer'><Link className='link__footer' to={'/'} >Inicio</Link></li>
                <li className='list__footer'><Link className='link__footer' to={'/servicios/ciudad-a-ciudad'} >Viajes de ciudad a ciudad</Link></li>
                <li className='list__footer'><Link className='link__footer' to={'/servicios/recogida-inmediata'} >Recogida inmediata</Link></li>
                <li className='list__footer'><Link className='link__footer' to={'/servicios/viaje-por-horas'} >Alquiler por horas y día completo</Link></li>
                <li className='list__footer'><Link className='link__footer' to={'/quienes-somos'} >Quiénes Somos</Link></li>
              </ul>
            </div>
            <div className='col-lg-3 col-sm-12 container__follow'>
              <h3 className='h3__footer'>Síguenos</h3>
              <ul className='p-0 ul__list--rrss'>
                <li className='list__footer'><a className='link__footer' href='/'><i className="fa-brands fa-instagram link--footer--rrss"></i></a></li>
                <li className='list__footer'><a className='link__footer' href='/'><i className="fa-brands fa-facebook-f link--footer--rrss"></i></a></li>
                <li className='list__footer'><a className='link__footer' href='/'><i className="fa-brands fa-x-twitter link--footer--rrss"></i></a></li>
              </ul>
            </div>
          </article>
        <hr className='text-white' />
      </section>
      <section className='container'>
        <article className='container row article__rrss'>
          <div className='col-lg-7 col-sm-12 container__politicas'>
            <p className=' link__footer--politicas link__footer--name'>© 2024 AppTaxio</p>
            <p className=' link__footer--politicas'>Condiciones</p>
            <p className=' link__footer--politicas'>Política de privacidad</p>
            <p className=' link__footer--politicas'>Aviso legal</p>
            <p className=' link__footer--politicas'>Accesibilidad</p>
          </div>
        </article>
      </section>
    </footer>
  )
}

export default Footer