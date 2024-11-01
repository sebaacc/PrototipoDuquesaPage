import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/ErrorPage.jsx'
import VerificationSuccess from './routes/VerificationSuccess.jsx'
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
import Category from './routes/Category.jsx'
import Subcategory from './routes/Subcategory.jsx'
import EditarPerfil from './routes/EditarPefil.jsx'
import VerificationError from './routes/VerificationError.jsx'
import VerificationUnnecessary from './routes/VerificationUnnecessary.jsx'
import ConfirmacionDeCompra from './routes/ConfirmacionDeCompra.jsx'
import ForgotPassword from './routes/ForgotPassword.jsx'
import ChangePassword from './routes/ChangePassword.jsx'
import ReporteDePedido from './routes/ReporteDePedido.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
  },
  {
    path: 'verificacion-exitosa',
    element: <VerificationSuccess />,
    errorElement: <ErrorPage />
  },
  {
    path: 'category',
    element: <Category />,
    errorElement: <ErrorPage />
  },
  {
    path: 'subcategory',
    element: <Subcategory />,
    errorElement: <ErrorPage />
  },
  {
    path: 'verificacion-error',
    element: <VerificationError />,
    errorElement: <ErrorPage />
  },
  {
    path: 'verificacion-revalidada',
    element: <VerificationUnnecessary />,
    errorElement: <ErrorPage />
  },
  {
    path: 'confirmacion-de-compra',
    element: <ConfirmacionDeCompra />,
    errorElement: <ErrorPage />
  },
  {
    path: 'editar-perfil',
    element: <EditarPerfil />,
    errorElement: <ErrorPage />
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />
  },
  {
    path: 'reset-password',
    element: <ChangePassword />,
    errorElement: <ErrorPage />
  },
  {
    path: 'reporte-pedido',
    element: <ReporteDePedido />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
