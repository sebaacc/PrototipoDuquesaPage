import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/lgofondoclaro-removebg-preview 1.png'

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

    if (!password) {
      newErrors.password = 'El campo de contraseña es requerido'
    }

    setErrors(newErrors)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F8FC]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow m-10 md:mt-20">
        <div className="flex items-center font-bold">
          <ArrowLeftIcon className="h-6 w-6 text-[#7F7C82]" />
          <Link to={'/'} className="text-sm text-[#7F7C82]">
            Volver al inicio
          </Link>
        </div>
        <div className="text-center">
          <img src={logo} alt="La Quesa Bakery" className="mx-auto h-24 w-32" />
          <div className="mt-6 flex justify-center space-x-4">
            {/* SVG icons */}
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Correo"
              className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">{errors.username}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
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
        <div className="flex justify-between text-sm text-[#7F7C82]">
          <Link to="#" className="">
            ¿Olvidé mi contraseña?
          </Link>
          <Link to="#" className="font-bold">
            Registrarse
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
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
