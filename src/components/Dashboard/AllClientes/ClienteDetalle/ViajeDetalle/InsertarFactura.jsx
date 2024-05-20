/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'

function InsertarFactura() {


    const [archivo, setArchivo] = useState(null)

    const handleUpload = async () => {
        console.log(archivo)

        const isnert = await fetch('http://localhost:3000/appTaxio/v1/factura', {
            method: 'POST',
            body: archivo
        })

        const response = await isnert.json()
        console.log(response)

    }



  return (
    <div className='d-flex flex-column'>
        <input type="file" className='mb-2'  />
        <button type="submit" onClick={handleUpload} >Subir PDF</button>
    </div>
  )
}

export default InsertarFactura