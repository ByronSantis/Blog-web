import React from 'react'
import {Link} from 'react-router-dom'

const ErrorPagina = () => {
  return (
    <div className='error-page'>  
      <div className='content'>
        <h1>404</h1>
        <br />
        <br />
        <h4 >¡opps! Pagina no encontrada</h4>
        <br/>
        <p>La pagina que intentas acceder no existe. Por favor, verifique su estado de red o ponganse en contacto con su servicio para resolver el problema.</p>
        <div className='btns'>  
        <Link t0="/">Volver al inicio</Link>
        </div>
      </div> 
    </div>
  )
}

export default ErrorPagina
