import { useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../components/Arrows/ArrowLeftIcon'
import logo from '../img/lgofondoclaro-removebg-preview 1.png'
import TogglePass from '../components/TogglePass'
import endpoints from '../utils/endpoints'
import { inputStyle } from '../utils/inputStyle'

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [passVisible, setPassVisible] = useState(false)
  const { token } = useParams()

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#.$%^&+=!])[A-Za-z\d@#.$%^&+=!]{8,}$/
    return regex.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!validatePassword(newPassword)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula, una letra minúscula y un carácter especial (@#.$%^&+=!).'
      )
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    try {
      const response = await axios.patch(
        `${endpoints.getAndPostUser}/${token}`,
        { password: newPassword }
      )
      setMessage(
        'Se ha cambiado la contraseña exitosamente, ahora puede iniciar sesión'
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
            Cambiar Contraseña
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-extrabold text-gray-700"
            >
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={passVisible ? 'text' : 'password'}
                value={newPassword}
                onChange={handlePasswordChange}
                required
                className={inputStyle}
              />
              <TogglePass
                passVisible={passVisible}
                setPassVisible={setPassVisible}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-extrabold text-gray-700"
            >
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={passVisible ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className={inputStyle}
              />
              <TogglePass
                passVisible={passVisible}
                setPassVisible={setPassVisible}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8B7BB1] hover:bg-[#BD6292] hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B7BB1]"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
