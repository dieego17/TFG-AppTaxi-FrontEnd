/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./asidePequeño.css";
import logo from "../../../../assets/images/logoBlanco.png";

function AsideDashboardPequeño() {
  const [showNavigation, setShowNavigation] = useState(false);

  const handleLogoClick = () => {
    setShowNavigation(prevState => !prevState);
  };

  const handleCloseMenu = () => {
    setShowNavigation(false); 
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/ogin";
  };

  const token = localStorage.getItem("token");
  const userName = token ? JSON.parse(atob(token.split(".")[1])).nombre : "";

  const inicial = userName.charAt(0);

  return (
    <div className="container__aside--pequeño">
      <section className="section__logo--pequeño" onClick={handleLogoClick}>
        <img className="logo__aside--pequeño" src={logo} alt="" />
      </section>
      <section className={`modal__menu ${showNavigation ? 'show' : ''}`}>
        <ul className="ul__aside--pequeño" onClick={handleCloseMenu}>
          <li className="list__aside--pequeño">
            <Link to={"/dashboard"}>
              <i className="fa-solid fa-house icon__aside--pequeño"></i>
            </Link>
          </li>
          <li className="list__aside--pequeño">
            <Link to={"/dashboard/resumen-financiero"}>
              <i className="fa-solid fa-chart-simple icon__aside--pequeño"></i>
            </Link>
          </li>
          <li className="list__aside--pequeño">
            <Link to={`/dashboard/clientes`}>
              <i className="fa-solid fa-users icon__aside--pequeño"></i>
            </Link>
          </li>
          <li className="list__aside--pequeño">
            <Link to={`/dashboard/crear-factura`}>
              <i className="fa-solid fa-file-invoice-dollar icon__aside--pequeño"></i>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="list__aside--pequeño list__aside--pequeño--perfil">
            <div className="dropdown">
              <button
                className="button__perfil--pequeño"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="foto__user--pequeño">
                  <p className="letra__perfil--pequeño">{inicial}</p>
                </div>
              </button>
              <ul className="dropdown-menu menu__desplegable--pequeño">
                <li className="list__deplegable--pequeño">
                  <button
                    onClick={handleLogout}
                    className="dropdown-item icon__aside--desplegable--pequeño"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AsideDashboardPequeño;
