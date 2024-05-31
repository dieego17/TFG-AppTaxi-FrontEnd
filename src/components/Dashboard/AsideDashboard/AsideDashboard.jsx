/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./aside.css";
import logo from "../../../assets/images/logoBlanco.png";

function AsideDashboard() {
  const token = localStorage.getItem("token");
  const userName = token ? JSON.parse(atob(token.split(".")[1])).nombre : "";

  const inicial = userName.charAt(0);

  //cerrar sesión
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container__aside">
      <section className="section__logo">
        <Link to={"/dashboard"}>
          <img className="logo__aside" src={logo} alt="" />
        </Link>
      </section>
      <ul className="ul__aside">
        <li className="list__aside">
          <Link to={"/dashboard"}>
            <i className="fa-solid fa-house icon__aside"></i>
          </Link>
        </li>
        <li className="list__aside">
          <Link to={"/dashboard/resumen-financiero"}>
            <i className="fa-solid fa-chart-simple icon__aside"></i>
          </Link>
        </li>
        <li className="list__aside">
          <Link to={`/dashboard/clientes`}>
            <i className="fa-solid fa-users icon__aside"></i>
          </Link>
        </li>
        <li className="list__aside">
          <Link to={`/dashboard/crear-factura`}>
            <i className="fa-solid fa-file-invoice-dollar icon__aside"></i>
          </Link>
        </li>
        <li className="list__aside list__aside--perfil">
          <div className="dropdown">
            <button
              className="button__perfil"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="foto__user">
                <p className="letra__perfil">{inicial}</p>
              </div>
            </button>
            <ul className="dropdown-menu menu__desplegable">
              <li className="list__deplegable">
                <button onClick={handleLogout} className="dropdown-item icon__aside--desplegable">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AsideDashboard;
