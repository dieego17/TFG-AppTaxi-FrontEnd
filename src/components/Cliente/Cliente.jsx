/* eslint-disable no-unused-vars */
import React from 'react'
import Login from '../Login/Login';


function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

let tokenExist = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now())

function Cliente() {

  const token = localStorage.getItem('token')
  const user = parseJwt(token)
  console.log(user)

  return (
    <div>
      {
        tokenExist ? <Cliente /> : <Login />
      }
    </div>
  )
}

export default Cliente