import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/lgofondoclaro-removebg-preview 1.png'

function SignUp () {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    documentNumber: '',
    phone: '',
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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#.$%^&+=!]).{8,}$/

    if (!form.firstName) newErrors.firstName = 'El campo de nombre es requerido'
    if (!form.lastName) newErrors.lastName = 'El campo de apellido es requerido'
    if (!form.username) {
      newErrors.username = 'El campo de nombre de usuario es requerido'
    }
    if (!form.documentNumber) {
      newErrors.documentNumber = 'El campo de número de documento es requerido'
    }
    if (!form.phone) newErrors.phone = 'El campo de teléfono es requerido'
    if (!form.email) {
      newErrors.email = 'El campo de correo es requerido'
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'El campo de correo debe ser válido'
    }
    if (!form.password) {
      newErrors.password = 'El campo de contraseña es requerido'
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula, una letra minúscula y un carácter especial (@#.$%^&+=!)'
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 my-16 w-[85vw]">
        <Link to={'/'} className="text-sm text-[#7F7C82] font-bold">
          <div className="flex items-center font-bold gap-3">
            <ArrowLeftIcon className="h-6 w-6 text-[#7F7C82]" />
            Volver al inicio
          </div>
        </Link>
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto h-32 w-auto" />
          <h2 className="mt-6 text-2xl font-extrabold text-[#2D5651]">
            ¡Crea tu cuenta!
          </h2>
        </div>
        <form
          className="mt-8 space-y-6 flex flex-col items-center gap-10"
          onSubmit={handleSubmit}
        >
          <section className="flex gap-10 flex-wrap justify-center">
            <div className="w-[320px]">
              <label
                htmlFor="firstName"
                className="block text-sm font-extrabold text-[#2D5651]"
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
            <div className="w-[320px]">
              <label
                htmlFor="lastName"
                className="block text-sm font-extrabold text-[#2D5651]"
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
          <section className="flex gap-10 flex-wrap justify-center">
            <div className="w-[320px]">
              <label
                htmlFor="username"
                className="block text-sm font-extrabold text-[#2D5651]"
              >
                Nombre de Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Nombre de Usuario"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-2">{errors.username}</p>
              )}
            </div>
            <div className="w-[320px]">
              <label
                htmlFor="email"
                className="block text-sm font-extrabold text-[#2D5651]"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Correo Electrónico"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email}</p>
              )}
            </div>
          </section>
          <section className="flex gap-10 flex-wrap justify-center">
            <div className="w-[320px]">
              <label
                htmlFor="phone"
                className="block text-sm font-extrabold text-[#2D5651]"
              >
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Teléfono"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2">{errors.phone}</p>
              )}
            </div>
            <div className="w-[320px]">
              <label
                htmlFor="documentNumber"
                className="block text-sm font-extrabold text-[#2D5651]"
              >
                Número de Documento
              </label>
              <input
                id="documentNumber"
                name="documentNumber"
                type="text"
                placeholder="Número de Documento"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.documentNumber}
                onChange={handleChange}
              />
              {errors.documentNumber && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.documentNumber}
                </p>
              )}
            </div>
          </section>
          <section className="flex gap-10 flex-wrap justify-center">
            <div className="w-[320px]">
              <label
                htmlFor="password"
                className="block text-sm font-extrabold text-[#2D5651]"
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
            <div className="w-[320px]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-extrabold text-[#2D5651]"
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
          </section>
          <button
            type="submit"
            className="w-40 m-auto flex justify-center bg-[#BD6292] text-white rounded p-2"
          >
            Registrarse
          </button>
        </form>
        <div className="flex flex-col items-center justify-between text-sm text-[#7F7C82]">
          <p>¿Ya tienes una cuenta? </p>
          <Link to="/login" className="">
            <span className="text-[#2D5651] font-semibold hover:font-extrabold">
              Iniciar Sesión
            </span>
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
