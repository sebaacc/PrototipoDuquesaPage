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

    // Validación de la contraseña
    const passwordMinLength = 8
    if (!password) {
      newErrors.password = 'El campo de contraseña es requerido'
    } else if (password.length < passwordMinLength) {
      newErrors.password = `La contraseña debe tener al menos ${passwordMinLength} caracteres`
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.33em"
              height="1em"
              viewBox="0 0 256 193"
              className='size-8'
            >
              <path
                fill="#4285f4"
                d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
              />
              <path
                fill="#34a853"
                d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
              />
              <path
                fill="#ea4335"
                d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
              />
              <path
                fill="#fbbc04"
                d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"
              />
              <path
                fill="#c5221f"
                d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
              className='size-8'
            >
              <path
                fill="#1877f2"
                d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
              />
              <path
                fill="#fff"
                d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
              className='size-8'
            >
              <g fill="none">
                <rect width="256" height="256" fill="#fff" rx="60" />
                <rect width="256" height="256" fill="#1d9bf0" rx="60" />
                <path
                  fill="#fff"
                  d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677c2.918.351 5.85.526 8.79.533a74.154 74.154 0 0 0 45.865-15.839a36.976 36.976 0 0 1-34.501-25.645a36.811 36.811 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.705 36.705 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.814 104.814 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.105 74.105 0 0 0 23.451-8.965a37.061 37.061 0 0 1-16.234 20.424A73.446 73.446 0 0 0 218 72.282a75.023 75.023 0 0 1-18.428 19.13"
                />
              </g>
            </svg>
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
