/* eslint-disable no-unused-vars */
import React from 'react'
import './footer.css'
import './responsiveFooter.css'

function Footer() {
  return (
    <footer className='footer'>
      <section className='container t-4'>
        <article className='article__lista row text-left'>
            <div className='col-lg-3 col-sm-12'>
              <div>
                <h3 className=''>Empresa</h3>
              </div>
              <ul className='p-0'>
                <li className='list__footer'><a className='link__footer' href="">Cómo trabajamos</a></li>
                <li className='list__footer'><a className='link__footer' href="">Trabaja con nosotros</a></li>
                <li className='list__footer'><a className='link__footer' href="">Blog</a></li>
                <li className='list__footer'><a className='link__footer' href="">Contacte con Nosotros</a></li>
              </ul>
            </div>
            <div className='col-lg-3 col-sm-12'>
              <div>
                <h3>Principales ciudades</h3>
              </div>
              <ul className='p-0'>
                <li className='list__footer'><a className='link__footer' href="">Talavera de la Reina</a></li>
                <li className='list__footer'><a className='link__footer' href="">Madrid</a></li>
                <li className='list__footer'><a className='link__footer' href="">Sevilla</a></li>
                <li className='list__footer'><a className='link__footer' href="">Herrera del Duque</a></li>
                <li className='list__footer'><a className='link__footer' href="">Barcelona</a></li>
                <li className='list__footer'><a className='link__footer' href="">Todas las ciudades</a></li>
              </ul>
            </div>
            <div className='col-lg-3 col-sm-12'>
              <div>
                <h3>Explorar</h3>
              </div>
              <ul className='p-0'>
                <li className='list__footer'><a className='link__footer' href='/'>Viajes de ciudad a ciudad</a></li>
                <li className='list__footer'><a className='link__footer' href='/'>Recogida inmediata</a></li>
                <li className='list__footer'><a className='link__footer' href='/'>Alquiler por horas y día completo</a></li>
              </ul>
            </div>
          </article>
        <hr className='text-white' />
      </section>
      <section className='container'>
        <article className='container row article__rrss'>
          <div className='col-lg-7 col-sm-12 container__politicas'>
            <a className='link__footer link__footer--politicas link__footer--name' href="/">© 2024 AppTaxio</a>
            <a className='link__footer link__footer--politicas' href="/">Condiciones</a>
            <a className='link__footer link__footer--politicas' href="/">Política de privacidad</a>
            <a className='link__footer link__footer--politicas' href="/">Aviso legal</a>
            <a className='link__footer link__footer--politicas' href="/">Accesibilidad</a>
          </div>
          <div className='col-lg-3 col-sm-12 container__rrss'>
            <a className='link__footer link__footer--rrss' href="/"><i className="bi bi-linkedin"></i></a>
            <a className='link__footer link__footer--rrss' href="/"><i className="bi bi-instagram"></i></a>
            <a className='link__footer link__footer--rrss' href="/"><i className="bi bi-facebook"></i></a>
            <a className='link__footer link__footer--rrss' href="/"><i className="bi bi-twitter-x"></i></a>
            <a className='link__footer link__footer--rrss' href="/"><i className="bi bi-youtube"></i></a>
          </div>
        </article>
      </section>
    </footer>
  )
}

export default Footer