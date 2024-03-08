import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className='footer_categories'>
        <li><Link to="/posts/categories/Devocionales">DEVOCIONALES</Link></li>
        <li><Link to="/posts/categories/Reflexiones">REFLEXIONES</Link></li>
        <li><Link to="/posts/categories/Datos Biblicos">DATOS BIBLICOS</Link></li>
        <li><Link to="/posts/categories/Investigaciones">INVESTIGACIONES</Link></li>
        <li><Link to="/posts/categories/Palabra de animo">PALABRA DE ANIMO</Link></li>
        <li><Link to="/posts/categories/Otros">OTROS</Link></li>
        <li><Link to="/posts/categories/Uncategorized">UNCATEGORIZED</Link></li>
      </ul>
      <div className='footer_copyright'>
        <small>ALL   RIGHTS   RESERVED &copy;   COPYRIGHT,  BREIDY.CL</small>
      </div>
    </footer>
  )
}

export default Footer
