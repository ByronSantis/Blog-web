import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const  [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const  registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
      const newUser = await response.data;
      console.log(newUser)
      if(!newUser){
        setError("No se pudo registrar. Intenta de nuevo.")
      }
      navigate('/login')
    }catch(err){
      setError(err.response.data.message)
    }
  }
  return (
    <section className='register'>
      <div className='container'>
          <h2>Registro</h2>
          <form action="" className='form register_form' onSubmit={registerUser}>
            {error &&<p className='form_error-message'>{error}</p>}
            <input type="text" placeholder='Nombre completo' name='name' value={userData.name} onChange=
            {changeInputHandler} autoFocus />
            <input type="email" placeholder='Correo electronico' name='email' value={userData.email} onChange=
            {changeInputHandler} autoFocus/>
            <input type="password" placeholder='Contraseña' name='password' value={userData.password} onChange=
            {changeInputHandler} autoFocus/>
            <input type="password" placeholder='Repita Contreña' name='password2' value={userData.password2} onChange=
            {changeInputHandler} autoFocus/>
            <button type='submit' className='btn primary'>Registrarme</button>
          </form>
          <small>¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link></small>
      </div>
    </section>
  )
}

export default Register
