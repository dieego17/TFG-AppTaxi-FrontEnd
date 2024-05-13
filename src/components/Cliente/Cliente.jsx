/* eslint-disable no-unused-vars */
import React from 'react'
import { useAuth } from '../../auth/AuthProvider'

function Cliente() {
  const auth = useAuth();
  const user = auth.getUser();

  return (
      <div>Bienvenido al cliente {user.nombre}
      
      {
        console.log(user.nombre)
      }
      </div>
      
  );
}


export default Cliente