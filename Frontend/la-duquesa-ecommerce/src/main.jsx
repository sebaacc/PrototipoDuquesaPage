import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/ErrorPage.jsx'
import Registro from './routes/Registro.jsx'
import Detalle from './routes/Detalle.jsx'
import RegistroProducto from './routes/RegistroProducto.jsx'
import CarritoDeCompras from './routes/CarritoDeCompras.jsx'
import Tienda from './routes/Tienda.jsx'
import ReporteDeUsuario from './routes/ReporteDeUsuario.jsx'
import ReporteDeProducto from './routes/ReporteDeProducto.jsx'
import LogIn from './routes/LogIn.jsx'
import Pagos from './routes/Pagos.jsx'
import Register from './routes/Register.jsx'
import NuestrasSedes from './routes/NuestrasSedes.jsx'

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
  },
  {
    path: 'detalle-de-producto/:id',
    element: <Detalle />,
    errorElement: <ErrorPage />
  },
  {
    path: 'tienda',
    element: <Tienda />,
    errorElement: <ErrorPage />
  },
  {
    path: 'reporte-usuario',
    element: <ReporteDeUsuario />,
    errorElement: <ErrorPage />
  },
  {
    path: 'reporte-producto',
    element: <ReporteDeProducto />,
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: 'pagos',
    element: <Pagos />,
    errorElement: <ErrorPage />
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: 'nuestras-sedes',
    element: <NuestrasSedes />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
