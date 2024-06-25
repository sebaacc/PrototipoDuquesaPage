import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SocialMedia from '../components/SocialMedia'
import endpoints from '../utils/endpoints'
import { ArrowLeftIcon } from '../components/Arrows/ArrowLeftIcon'
import { jwtDecode } from 'jwt-decode'
import TogglePass from '../components/TogglePass'
import { inputStyle } from '../utils/inputStyle'

function LogIn () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [passVisible, setPassVisible] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = { username: '', password: '' }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!username) {
      newErrors.username = 'El campo de correo es requerido'
    } else if (!emailRegex.test(username)) {
      newErrors.username = 'El correo debe ser un correo válido'
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
      const response = await axios.post(endpoints.postLogin, values)

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access_token)
        localStorage.setItem(
          'user',
          JSON.stringify(jwtDecode(response.data.access_token))
        )
        console.log(jwtDecode(response.data.access_token))
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const errorStyle = 'text-red-500 text-sm mt-2 font-semibold'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F8FC]">
      <div className="p-8 space-y-6 bg-white rounded-lg shadow m-10 w-[85vw] max-w-xl">
        <div className="flex items-center font-bold">
          <Link to={'/'} className="text-sm text-[#7F7C82] font-bold">
            <div className="flex items-center font-bold gap-3">
              <ArrowLeftIcon className="h-6 w-6 text-[#7F7C82]" />
              Volver al inicio
            </div>
          </Link>
        </div>
        <SocialMedia />
        <form
          className="space-y-6 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-extrabold text-[#2D5651]"
            >
              Correo
            </label>
            <input
              id="username"
              type="text"
              placeholder="Correo"
              className={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className={errorStyle}>{errors.username}</p>}
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-extrabold text-[#2D5651]"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={passVisible ? 'text' : 'password'}
                placeholder="Contraseña"
                className={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TogglePass
                passVisible={passVisible}
                setPassVisible={setPassVisible}
              />
            </div>
            {errors.password && <p className={errorStyle}>{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-40 m-auto flex justify-center text-white rounded p-2 bg-[#8B7BB1] hover:bg-[#BD6292] hover:shadow-md transition-all duration-300"
          >
            Ingresar
          </button>
        </form>
        <div className="flex flex-col items-center justify-between text-sm text-[#7F7C82]">
          <Link
            to="/forgot-password"
            className="text-[#2D5651] font-semibold hover:font-extrabold"
          >
            ¿Olvidé mi contraseña?
          </Link>

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
