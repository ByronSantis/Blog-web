import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FaUserEdit } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const PerfilUsuario = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')

  const [isAvatarrTouched, setIsAvatarTouched] = useState(false)

  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  useEffect(() => {
    if(!token){
      navigate('/login') 
    }
  })

  useEffect(() =>  {
    const getUser =  async () => { 
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}` }})
      const {name, email, avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }

    getUser();
  }, [])

  const changeAvatarHandle = async () => {
    setIsAvatarTouched(false);
    try{
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setAvatar(response?.data.avatar)
    }catch(error){
      console.log(error);
    }
  }

  const updateUserDetails = async (e) => {
    e.preventDefault();

    try{
    const userData = new FormData();
    userData.set('name', name);
    userData.set('email', email);
    userData.set('currentPassword', currentPassword);
    userData.set('newPassword', newPassword);
    userData.set('confirmNewPassword', confirmNewPassword);

    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
    if(response.status == 200){
      navigate('/logout')
    }
    }catch(error){
      setError(error.response.data.message);
    }
  }



  return (
    <section className='profile'>
      <div className='container profile_container'>
        <Link to={`/myposts/${currentUser.id}`} className='btn'>Ver mis publicaciones</Link>
        <div className='profile_details'>
            <div className='avatar_wrapper'>
                <div className='profile_avatar'>
                  <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
                </div>
                <form action="" className='avatar_form'>
                    <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} 
                    accept='png, jpg, jpeg' />
                    <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)} ><FaUserEdit /></label>
                </form>
          {isAvatarrTouched &&  <button className='profile_avatar-btn' onClick={changeAvatarHandle}><MdImageSearch/></button>}
            </div>
            <h1>{currentUser.name}</h1>

            <form action="" className='form profile_form' onSubmit={updateUserDetails}>
                 {error && <p className='form_error-message'>{error}</p> }
                  <input type="text" placeholder='Ingresa nuevo nombre' value={name} onChange={e => setName(e.target.value)} />
                  <input type="email" placeholder='Ingresa nuevo Email' value={email} onChange={e => setEmail(e.target.value)} />
                  <input type="password" placeholder='Ingresa contraseña antigua' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                  <input type="password" placeholder='Ingresa nueva contraseña' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  <input type="password" placeholder='Confirma nueva contraseña' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                  <button type='submit' className='btn primary'>Guardar</button>
            </form>
        </div>
      </div>
    </section>
  )
}

export default PerfilUsuario
