import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/lgofondoclaro-removebg-preview 1.png'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import endpoints from '../utils/endpoints'

function SignUp () {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    document: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [creationError, setCreationError] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    console.log(form)
  }, [form])

  const [passVisible, setPassVisible] = useState(false)

  const togglePassVisibility = () => {
    setPassVisible((prev) => !prev)
  }
  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#.$%^&+=!]).{8,}$/

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
    const lastNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
    const telRegex = /^[0-9\s]+$/
    const documentRegex = /^[0-9\s]+$/

    if (!nameRegex.test(form.first_name)) {
      newErrors.firstName = 'El nombre no debe contener números'
    }
    if (!form.first_name) {
      newErrors.firstName = 'El campo de nombre es requerido'
    }
    if (!lastNameRegex.test(form.last_name)) {
      newErrors.lastName = 'El apellido no debe contener números'
    }
    if (!form.last_name) {
      newErrors.lastName = 'El campo de apellido es requerido'
    }
    if (!form.username) {
      newErrors.username = 'El campo de nombre de usuario es requerido'
    }
    if (!documentRegex.test(form.document)) {
      newErrors.documentNumber =
        'El número de documento no debe contener letras'
    }
    if (!form.document) {
      newErrors.documentNumber = 'El campo de número de documento es requerido'
    }
    if (!telRegex.test(form.phone)) {
      newErrors.phone = 'El teléfono no debe contener letras'
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
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'El campo de repetir contraseña es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      createAccount()
    }
  }

  const createAccount = async () => {
    // Estado para poner un loader
    setLoadingOpen(true)
    const { confirmPassword, ...newForm } = form
    console.log(newForm)

    try {
      const response = await axios.post(endpoints.SaveUser, newForm)

      if (response.status === 200) {
        setLoadingOpen(false)
        setSuccessOpen(true)
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      setLoadingOpen(false)
      // Estado para mostrar error al crear cuenta
      setCreationError(true)
      // setFieldError('email', '¡Ya existe una cuenta con ese correo!');
    }
  }
  const errorStyle = 'text-red-500 text-sm mt-2 font-semibold'

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
                name="first_name"
                type="text"
                placeholder="Nombre"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.first_name}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className={errorStyle}>{errors.firstName}</p>
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
                name="last_name"
                type="text"
                placeholder="Apellido"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.last_name}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className={errorStyle}>{errors.lastName}</p>
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
                <p className={errorStyle}>{errors.username}</p>
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
              {errors.email && <p className={errorStyle}>{errors.email}</p>}
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
              {errors.phone && <p className={errorStyle}>{errors.phone}</p>}
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
                name="document"
                type="text"
                placeholder="Número de Documento"
                className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                value={form.document}
                onChange={handleChange}
              />
              {errors.documentNumber && (
                <p className={errorStyle}>{errors.documentNumber}</p>
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
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passVisible ? 'text' : 'password'}
                  placeholder="Contraseña"
                  className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                  value={form.password}
                  onChange={handleChange}
                />

                <div
                  onClick={togglePassVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 text-lg"
                >
                  {passVisible ? <MdVisibility /> : <MdVisibilityOff />}
                </div>
              </div>

              {errors.password && (
                <p className={errorStyle}>{errors.password}</p>
              )}
            </div>
            <div className="w-[320px]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-extrabold text-[#2D5651]"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={passVisible ? 'text' : 'password'}
                  placeholder="Confirmar Contraseña"
                  className="mt-1 block w-full p-3 border-1 bg-gray-200 rounded-lg appearance-none"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  onClick={togglePassVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 text-lg"
                >
                  {passVisible ? <MdVisibility /> : <MdVisibilityOff />}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className={errorStyle}>{errors.confirmPassword}</p>
              )}
            </div>
          </section>

          {loadingOpen && <Loader />}

          {successOpen && (
            <article className="text-green-700 bg-green-100 p-2 rounded">
              Tu cuenta ha sido creada exitosamente, dirígete a tu correo para
              verificarla.
            </article>
          )}

          {creationError && (
            <article className="text-red-700 bg-red-100 p-2 rounded font-semibold">
              Ha habido un error al crear la cuenta. Por favor intente
              nuevamente.
            </article>
          )}

          {successOpen
            ? (
            <Link to={'/login'}>
              <div className="w-40 m-auto flex justify-center bg-[#BD6292] text-white rounded p-2">
                Iniciar sesión
              </div>
            </Link>
              )
            : (
            <button
              type="submit"
              className="w-40 m-auto flex justify-center text-white rounded p-2 bg-[#8B7BB1] hover:bg-[#BD6292] hover:shadow-md transition-all duration-300"
            >
              Registrarse
            </button>
              )}
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
