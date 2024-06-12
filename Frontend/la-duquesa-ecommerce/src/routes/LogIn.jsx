import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SocialMedia from '../components/SocialMedia'

function LogIn () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = { username: '', password: '' }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!username) {
      newErrors.username = 'El campo de usuario es requerido'
    } else if (!emailRegex.test(username)) {
      newErrors.username = 'El campo de usuario debe ser un correo válido'
    }

    // Validación de la contraseña
    const passwordMinLength = 8
    if (!password) {
      newErrors.password = 'El campo de contraseña es requerido'
    } else if (password.length < passwordMinLength) {
      newErrors.password = `La contraseña debe tener al menos ${passwordMinLength} caracteres`
    }

    if (newErrors.username === '' && newErrors.password === '') {
      fetchData()
    }

    setErrors(newErrors)
  }

  const fetchData = async () => {
    const values = {
      username,
      password
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'))

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      const response = await axios.post(
        'http://localhost:8090/users/login',
        values,
        config
      )

      if (response.status === 200) {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error updating user:', error)
      // setFieldError('email', '¡Ya existe una cuenta con ese correo!');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F8FC]">
      <div className="p-8 space-y-6 bg-white rounded-lg shadow m-10 w-[85vw]">
        <div className="flex items-center font-bold">
          <Link to={'/'} className="text-sm text-[#7F7C82] font-bold">
            <div className="flex items-center font-bold gap-3">
              <ArrowLeftIcon className="h-6 w-6 text-[#7F7C82]" />
              Volver al inicio
            </div>
          </Link>
        </div>
        <SocialMedia />
        <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className='max-w-[400px]'>
            <label
              htmlFor="username"
              className="block text-sm font-extrabold text-[#2D5651]"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">{errors.username}</p>
            )}
          </div>
          <div className='max-w-[400px]'>
            <label
              htmlFor="password"
              className="block text-sm font-extrabold text-[#2D5651]"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="mt-1 block w-full p-3 bg-gray-200 rounded-lg appearance-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-40 m-auto flex justify-center bg-[#BD6292] text-white rounded p-2"
          >
            Ingresar
          </button>
        </form>
        <div className="flex flex-col items-center justify-between text-sm text-[#7F7C82]">
          <p>¿Olvidé mi contraseña?</p>
          <Link
            to="/register"
            className="text-[#2D5651] font-semibold hover:font-extrabold"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogIn

function ArrowLeftIcon (props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
