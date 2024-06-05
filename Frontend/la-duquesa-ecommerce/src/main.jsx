import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/ErrorPage.jsx'
import Registro from './routes/Registro.jsx'
import RegistroProducto from './routes/RegistroProducto.jsx'
import CarritoDeCompras from './routes/CarritoDeCompras.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'registro',
    element: <Registro />,
    errorElement: <ErrorPage />
  },
  {
    path: 'registro-producto',
    element: <RegistroProducto />,
    errorElement: <ErrorPage />
  },
  {
    path: 'carrito-de-compras',
    element: <CarritoDeCompras />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
