import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RegistroProducto () {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagenes: []
  })

  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const fileInputRef = useRef(null) // Ref para el input de archivos

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))

    // Validación en tiempo real para el campo de precio
    if (id === 'precio') {
      if (isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: 'Por favor, introduce un precio válido.'
        }))
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))
      }
    }

    // Validación en tiempo real para el campo de nombre
    if (id === 'nombre') {
      if (/\d/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: 'El nombre no debe contener números.'
        }))
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))
      }
    }
  }

  const handleBlur = (e) => {
    const { id, value } = e.target
    let errorMessage = ''

    if (!value) {
      errorMessage = 'Por favor, rellena este campo.'
    } else if (id === 'precio' && isNaN(value)) {
      errorMessage = 'Por favor, introduce un precio válido.'
    } else if (id === 'descripcion' && value.length < 10) {
      errorMessage = 'La descripción debe tener al menos 10 caracteres.'
    } else if (id === 'nombre' && /\d/.test(value)) {
      errorMessage = 'El nombre no debe contener números.'
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const validImageTypes = ['image/jpeg', 'image/png']
    const newImages = []
    const newErrors = { ...errors }

    files.forEach((file) => {
      if (validImageTypes.includes(file.type)) {
        newImages.push({
          file,
          url: URL.createObjectURL(file)
        })
      } else {
        newErrors.imagen = 'Solo se permiten archivos JPG o PNG.'
      }
    })

    if (newImages.length > 0) {
      newErrors.imagen = '' // Borrar error si se han agregado imágenes válidas
    }

    setFormData((prevData) => ({
      ...prevData,
      imagenes: [...prevData.imagenes, ...newImages]
    }))
    setErrors(newErrors)
  }

  const handleRemoveImage = (index) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index)

    // Crear un nuevo DataTransfer y agregar las imágenes restantes
    const dataTransfer = new DataTransfer()
    newImages.forEach((image) => {
      dataTransfer.items.add(image.file)
    })

    // Actualizar el estado del formulario
    setFormData((prevData) => ({
      ...prevData,
      imagenes: newImages
    }))

    // Actualizar el input de archivos
    fileInputRef.current.files = dataTransfer.files

    // Mostrar alerta de error si no quedan imágenes
    setErrors((prevErrors) => ({
      ...prevErrors,
      imagen:
        newImages.length === 0 ? 'Por favor, sube al menos una imagen.' : ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formErrors = {}

    if (!formData.nombre) {
      formErrors.nombre = 'Por favor, rellena este campo.'
    } else if (/\d/.test(formData.nombre)) {
      formErrors.nombre = 'El nombre no debe contener números.'
    }

    if (!formData.precio) {
      formErrors.precio = 'Por favor, rellena este campo.'
    } else if (isNaN(formData.precio)) {
      formErrors.precio = 'Por favor, introduce un precio válido.'
    }

    if (!formData.descripcion) {
      formErrors.descripcion = 'Por favor, rellena este campo.'
    } else if (formData.descripcion.length < 10) {
      formErrors.descripcion =
        'La descripción debe tener al menos 10 caracteres.'
    }

    if (formData.imagenes.length === 0) {
      formErrors.imagen = 'Por favor, sube al menos una imagen.'
    }

    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      // Simula el registro del producto y muestra la alerta
      setShowAlert(true)

      // Restablece los campos del formulario
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        imagenes: []
      })

      // Limpia el input de archivos
      fileInputRef.current.value = ''

      // Oculta la alerta después de 6 segundos
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)

      console.log('Form data:', formData)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form
          className="w-4/5 max-w-lg m-auto mb-10"
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
                } rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                id="nombre"
                type="text"
                placeholder="Nombre del producto"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs italic">{errors.nombre}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                htmlFor="precio"
              >
                Precio
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                  $
                </span>
                <input
                  className={`appearance-none block w-full pl-8 bg-gray-200 text-gray-700 border ${
                    errors.precio ? 'border-red-500' : 'border-gray-200'
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2`}
                  id="precio"
                  type="text"
                  placeholder="0000"
                  value={formData.precio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.precio && (
                <p className="text-red-500 text-xs italic">{errors.precio}</p>
              )}
            </div>
            <div className="w-full px-3 mb-6 mt-4">
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
                } rounded-lg bg-[#e5e7eb] text-base focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2`}
                value={formData.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={1000}
              />
              {errors.descripcion && (
                <p className="text-red-500 text-xs italic">
                  {errors.descripcion}
                </p>
              )}
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="imagenes"
              >
                Imágenes
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                  errors.imagen ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white mb-2`}
                id="imagenes"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {errors.imagen && (
                <p className="text-red-500 text-xs italic">{errors.imagen}</p>
              )}
              <div className="grid grid-cols-3 gap-4 mt-2">
                {formData.imagenes.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-auto rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 mt-1 mr-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {showAlert && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">
                ¡Producto registrado con éxito!
              </strong>
              <span className="block sm:inline">
                {' '}
                Los detalles del producto han sido guardados.
              </span>
            </div>
          )}
          <div className="flex justify-center">
            {' '}
            {/* Centrando el botón */}
            <button
              className="shadow bg-[#a662bd] hover:bg-purple-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              type="submit"
            >
              Registrar Producto
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  )
}

export default RegistroProducto
