import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/ErrorPage.jsx'
import Registro from './routes/Registro.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: 'registro',
    element: <Registro/>,
    errorElement: <ErrorPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
