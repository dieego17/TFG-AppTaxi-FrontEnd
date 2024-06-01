/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../../../assets/images/logoBlanco.png'    
import { Link } from 'react-router-dom'
import './footerCliente.css'


function FooterCliente() {
  return (
    <footer className='footer__cliente'>
      <section className='container t-4 container__texto--footer'>
        <article className='article__lista row text-left'>
            <div className='col-lg-4 col-sm-12 mt-3'>
              <img className='logo__footer' src={logo} alt="" />
              <p className='text__resumen'>
                AppTaxio es una plataforma que conecta a pasajeros con conductores de taxi. 
                Nuestro objetivo es ofrecer un servicio de calidad y seguro a todos nuestros usuarios.
              </p>
            </div>
            <div className='col-lg-3 col-sm-12 container__follow'>
              <h3 className='h3__footer'>Síguenos</h3>
              <ul className='p-0 ul__list--rrss'>
                <li className='list__footer'><a className='link__footer' href='/'><i className="fa-brands fa-instagram link--footer--rrss"></i></a></li>
                <li className='list__footer'><a className='link__footer' href='/'><i className="fa-brands fa-facebook-f link--footer--rrss"></i></a></li>
                <li className='list__footer'><a className='link__footer' href='/'><i className="fa-brands fa-x-twitter link--footer--rrss"></i></a></li>
              </ul>
              <h3 className='h3__footerCliente'>¡Gracias por visitarnos!</h3>
            </div>
          </article>
      </section>
      <section className='container'>
      <hr className='text-white' />
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

export default FooterCliente