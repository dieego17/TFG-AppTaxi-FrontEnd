/* eslint-disable no-unused-vars */
import React from 'react'
import './footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <section className='container'>
        <div className='row p-5 justify-content-center align-items-center'>
          <article className='row col-lg-6 col-md-12 text-center'>
            <div className='col-lg-4 col-md-12 text-center'>
              <div>
                <h3>Company</h3>
              </div>
              <div className='d-flex flex-column'>
                <a href='/'>About Us</a>
                <a href='/'>Contact Us</a>
                <a href='/'>Careers</a>
              </div>
            </div>
            <div className='col-lg-4 col-md-12 text-center'>
              <div>
                <h3>Support</h3>
              </div>
              <div className='d-flex flex-column'>
                <a href='/'>FAQ</a>
                <a href='/'>Help Desk</a>
                <a href='/'>Forums</a>
              </div>
            </div>
            <div className='col-lg-4 col-md-12 text-center'>
              <div>
                <h3>Legal</h3>
              </div>
              <div className='d-flex flex-column'>
                <a href='/'>Terms of Service</a>
                <a href='/'>Privacy Policy</a>
                <a href='/'>Cookie Policy</a>
              </div>
            </div>
          </article>
          <article className='col-lg-6 col-md-12 text-center'>
            <div className='mb-4'>
              <p>Suscribite a nuestra newsletter</p>
              <form method='' action="">
                <input className='me-2' type="text" name="" id="" />
                <button type='submit'>SUSCRIBIRSE</button>
              </form>
            </div>
            <div className='mt-5'>
              <p className=''>Siguenos</p>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </article>
        </div>
      </section>
    </footer>
  )
}

export default Footer