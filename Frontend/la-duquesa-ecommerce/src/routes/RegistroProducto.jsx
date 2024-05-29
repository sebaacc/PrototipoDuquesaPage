import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RegistroProducto () {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: null
  })

  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData((prevData) => ({ ...prevData, imagen: file }))
    setErrors((prevErrors) => ({ ...prevErrors, imagen: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formErrors = {}

    if (!formData.nombre) formErrors.nombre = 'Por favor, rellena este campo.'
    if (!formData.precio) formErrors.precio = 'Por favor, rellena este campo.'
    if (!formData.descripcion) {
      formErrors.descripcion = 'Por favor, rellena este campo.'
    }
    if (!formData.imagen) formErrors.imagen = 'Por favor, sube una imagen.'

    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      console.log('Form data:', formData)
    }
  }

  return (
    <div>
      <Navbar />
      <form
        className="w-4/5 max-w-lg m-auto mt-10 mb-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors.nombre ? 'border-red-500' : 'border-gray-200'
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="nombre"
              type="text"
              placeholder="Nombre del producto"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs italic">{errors.nombre}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
              htmlFor="precio"
            >
              Precio
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors.precio ? 'border-red-500' : 'border-gray-200'
              } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-6`}
              id="precio"
              type="text"
              placeholder="$0000"
              value={formData.precio}
              onChange={handleChange}
            />
            {errors.precio && (
              <p className="text-red-500 text-xs italic">{errors.precio}</p>
            )}
          </div>
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              className={`block w-full p-4 border ${
                errors.descripcion ? 'border-red-500' : 'border-gray-300'
              } rounded-lg bg-[#e5e7eb] text-base focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6`}
              maxLength={100}
              value={formData.descripcion}
              onChange={handleChange}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs italic">
                {errors.descripcion}
              </p>
            )}
          </div>
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="imagen"
            >
              Imagen
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors.imagen ? 'border-red-500' : 'border-gray-200'
              } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
              id="imagen"
              type="file"
              onChange={handleImageChange}
            />
            {errors.imagen && (
              <p className="text-red-500 text-xs italic">{errors.imagen}</p>
            )}
            {formData.imagen && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(formData.imagen)}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#8B7BB1] hover:bg-[#BD6292] text-white font-bold py-2 px-4 rounded"
          >
            Registrar Producto
          </button>
        </div>
        {showAlert && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 mt-4"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only text-w">Info</span>
            <div className='text-white'>
              <span className="font-medium text-[#BD6292]">Producto agregado con éxito!</span>{' '}
              Tu producto ha sido registrado.
            </div>
          </div>
        )}
      </form>
      <Footer />
    </div>
  )
}

export default RegistroProducto
