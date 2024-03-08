import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

import Layout from './components/Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPagina from './pages/ErrorPagina';
import Home from './pages/Home';
import DetallePost from './pages/DetallePost';
import Register from './pages/Register';
import Login from './pages/Login';
import PerfilUsuario from './pages/PerfilUsuario';
import Autores from './pages/Autores';
import CrearPost from './pages/CrearPost';
import Categoria from './pages/Categoria';
import AutorPost from './pages/AutorPost';
import Dashboard from './pages/Dashboard';
import EditarPost from './pages/EditarPost';
import Salir from './pages/Salir';
import BorrarPost from './pages/BorrarPost';
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPagina/>,
    children:[
      {index: true, element: <Home/>},
      {path: "posts/:id", element: <DetallePost/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>},
      {path: "profile/:id", element: <PerfilUsuario/>},
      {path: "authors", element: <Autores/>},
      {path: "create", element: <CrearPost/>},
      {path: "posts/categories/:category", element: <Categoria/>},
      {path: "posts/users/:id", element: <AutorPost/>},
      {path: "myposts/:id", element: <Dashboard/>},
      {path: "posts/:id/edit", element: <EditarPost/>},
      {path: "posts/:id/delete", element: <BorrarPost/>},
      {path: "logout", element: <Salir/>},
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


