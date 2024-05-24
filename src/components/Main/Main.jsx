/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../Layout';
import Login from '../Login/Login';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


let tokenExisteYEsValido = parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now();

function Main() {


  return (
    <div>
        {
            tokenExisteYEsValido ? <Layout /> : <Login />
        }
    </div>
  )
}

export default Main