/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'

//componente de Layout 
function Layout() {
  return (
    <div>
      {/* Componente Header para que el menu se muestre en todas las pantallas */}
        <header>
            <Header />
        </header>
        {/* Coponenete Outlet para que se muestre toda la información de las rutas aqui */}
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Layout