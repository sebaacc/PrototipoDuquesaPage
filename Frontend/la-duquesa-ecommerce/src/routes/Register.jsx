import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/lgofondoclaro-removebg-preview 1.png'

function SignUp () {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordMinLength = 8

    if (!form.firstName) newErrors.firstName = 'El campo de nombre es requerido'
    if (!form.lastName) newErrors.lastName = 'El campo de apellido es requerido'
    if (!form.gender) newErrors.gender = 'El campo de género es requerido'
    if (!form.email) {
      newErrors.email = 'El campo de correo es requerido'
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'El campo de correo debe ser válido'
    }
    if (!form.password) {
      newErrors.password = 'El campo de contraseña es requerido'
    } else if (form.password.length < passwordMinLength) {
      newErrors.password = `La contraseña debe tener al menos ${passwordMinLength} caracteres`
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      // enviar datos al servidor o realizar acciones adicionales
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F8FC]">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow m-10 md:mt-20 ">
        <Link to={'/'} className="text-sm text-[#7F7C82] font-bold">
          <div className="flex items-center font-bold">
            <ArrowLeftIcon className="h-6 w-6 text-[#7F7C82]" />
            Volver al inicio
          </div>
        </Link>
        <div className="text-center">
          <img src={logo} alt="La Quesa Bakery" className="mx-auto h-24 w-32" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="flex gap-10">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Nombre"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-2">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Apellido"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-2">{errors.lastName}</p>
              )}
            </div>
          </section>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Género
            </label>
            <select
              id="gender"
              name="gender"
              placeholder="seleccione"
              className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="select">Seleccione</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Prefiero No Decirlo </option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-2">{errors.gender}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo"
              className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">{errors.email}</p>
            )}
          </div>
          <section>

          </section>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Contraseña"
              className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-40 m-auto flex justify-center bg-[#BD6292] text-white rounded p-2"
          >
            Registrarse
          </button>
        </form>
        <div className="flex justify-between text-sm text-[#7F7C82]">
          <Link to="/login" className="">
            ¿Ya tienes una cuenta?{' '}
            <span className="hover:font-bold">Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp

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
