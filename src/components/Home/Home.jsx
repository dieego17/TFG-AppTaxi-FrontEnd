/* eslint-disable no-unused-vars */
import React from 'react'
import './home.css'
import taxi from '../../assets/images/taxi__header.png';
import { Link } from 'react-router-dom';

 

function Home() {
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
      </div>
      <section className='container'>
        <article className='row justify-content-around p-5'>
          <div className="card col-2" /* style="width: 18rem;" */>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          <div className="card col-2" /* style="width: 18rem;" */>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          <div className="card col-2" /* style="width: 18rem;" */>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          <div className="card col-2" /* style="width: 18rem;" */>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Home