import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/userContext' 

const Login = () => {
  const  [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState("")
  const  navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('')
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData)
      const user = await response.data;
      setCurrentUser(user)
      navigate('/')
    }catch(err){
      setError(err.response.data.message)
    }
  }
  return (
    <section className='login'>
      <div className='container'>
          <h2>Inicio de sesion</h2>
          <form action="" className='form login_form' onSubmit={loginUser}>
           {error && <p className='form_error-message'>{error}</p>} 
            <input type="email" placeholder='Correo electronico' name='email' value={userData.email} onChange=
            {changeInputHandler} autoFocus/>
            <input type="password" placeholder='Contraseña' name='password' value={userData.password} onChange=
            {changeInputHandler} autoFocus/>
            <button type='submit' className='btn primary'>Ingresar</button>
          </form>
          <small>¿No tienes cuenta? <Link to="/register">Registrate aquí</Link></small>
      </div>
    </section>
  )
}

export default Login
