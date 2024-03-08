import React,{useState, useContext} from 'react'
import {Link} from "react-router-dom"
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import Logo from '../imgs/logo.png'
import {UserContext} from '../context/userContext'


const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const {currentUser} = useContext(UserContext)
  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
  }else{
    setIsNavShowing(true);
  }
}
  return (
    <div>
      <nav>
        <div className='container nav_container'>
            <Link to="/" className="nav_logo" onClick={closeNavHandler}>
                <img src={Logo} alt="Navbar Logo" />
            </Link>
            {currentUser?.id && isNavShowing && <ul className='nav_menu'>
                <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link></li>
                <li><Link to="/create" onClick={closeNavHandler}>Crear publicacion</Link></li>
                <li><Link to="/authors" onClick={closeNavHandler}>Usuarios</Link></li>
                <li><Link to="/logout" onClick={closeNavHandler}>Cerrar sesion</Link></li>
            </ul>}

            {!currentUser?.id && isNavShowing && <ul className='nav_menu'>
                <li><Link to="/register" onClick={closeNavHandler}>Registro</Link></li>
                <li><Link to="/login" onClick={closeNavHandler}>Iniciar sesion</Link></li>
            </ul>}

            <button className='nav_toggle-btn' onClick={() => setIsNavShowing(!isNavShowing) }>
                  {isNavShowing ? <AiOutlineClose/> : <FaBars/>}  
            </button>
        </div>
      </nav>
    </div>
  )
}

export default Header
