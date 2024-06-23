import { useState } from 'react'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../components/Arrows/ArrowLeftIcon'
import logo from '../img/lgofondoclaro-removebg-preview 1.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      const response = await axios.post(endpoints.postForgotPass, { email })
      setMessage(
        'Se envió un mail a su correo, por favor revise su casilla para cambiar su contraseña.'
      )
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            'Algo salió mal. Por favor, intente nuevamente.'
        )
      } else {
        setError(
          'Error al conectar con el servidor. Por favor, intente nuevamente.'
        )
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <Link to={'/'} className="text-sm text-[#7F7C82] font-bold">
          <div className="flex items-center font-bold gap-3">
            <ArrowLeftIcon className="h-6 w-6 text-[#7F7C82]" />
            Volver al inicio
          </div>
        </Link>
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto h-32 w-auto" />
          <h2 className="mt-6 text-2xl font-extrabold text-[#2D5651] mb-16">
            Recuperar Contraseña
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-extrabold text-[#2D5651]"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full m-auto flex justify-center text-white rounded p-2 bg-[#8B7BB1] hover:bg-[#BD6292] hover:shadow-md transition-all duration-300"
          >
            Cambiar Contraseña
          </button>
        </form>
        {message && <div className="mt-4 text-green-500">{message}</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  )
}

export default ForgotPassword
