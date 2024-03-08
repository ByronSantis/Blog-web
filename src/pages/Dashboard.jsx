import React,{useState, useContext, useEffect} from 'react'
import {DUMMY_POSTS} from '../data'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader'
import BorrarPost from './BorrarPost'

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  useEffect(() => {
    if(!token){
      navigate('/login') 
    }
  })

  useEffect(() =>  {
    const fetchPosts = async () => {
      setIsLoading(true)
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}}) 
        setPosts(response.data)
      }catch(error){
        console.log(error)
      }
      setIsLoading(false);
    }
    fetchPosts();
  }, [id])



  if(isLoading){
    return <Loader/>
  }





  return (
    <section className='dashboard'>
       <center><h1>Mis publicaciones</h1></center>
       <br />
       <br />
      {
        posts.length > 0 ? <div className='container dashboard_container'>
            {
              posts.map(post =>{
                return <article key={posts.id} className='dashboard_post'>
                    <div className='dashboard_post-info'>
                        <div className='dashboard_post-thumbnail'>
                          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                        </div>
                        <h5>{post.title}</h5>
                    </div>
                    <div className='dashboard_post-actions'>
                        <Link to={`/posts/${post._id}`} className='btn sm'>Ver</Link>
                        <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Editar</Link>
                        <BorrarPost postId={post._id} />
                    </div>
                </article>
              })
            }
        </div> : <h2 className='center'>Aun no tienes publicaciones.</h2>
      }
    </section>
  )
}

export default Dashboard
