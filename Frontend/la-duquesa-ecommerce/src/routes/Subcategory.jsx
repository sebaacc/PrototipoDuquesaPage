import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import endpoints from '../utils/endpoints'

function Subcategory () {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    categoria: ''
  })

  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(endpoints.categories) // Asegúrate de que 'endpoints.categories' esté configurado correctamente
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))

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
    } else if (id === 'descripcion' && value.length < 10) {
      errorMessage = 'La descripción debe tener al menos 10 caracteres.'
    } else if (id === 'nombre' && /\d/.test(value)) {
      errorMessage = 'El nombre no debe contener números.'
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const validImageTypes = ['image/jpeg', 'image/png']
    const newErrors = { ...errors }

    if (file && validImageTypes.includes(file.type)) {
      setFormData((prevData) => ({
        ...prevData,
        imagen: {
          file,
          url: URL.createObjectURL(file)
        }
      }))
      newErrors.imagen = ''
    } else {
      newErrors.imagen = 'Solo se permiten archivos JPG o PNG.'
    }

    setErrors(newErrors)
  }

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      imagen: null
    }))
    fileInputRef.current.value = ''
    setErrors((prevErrors) => ({
      ...prevErrors,
      imagen: 'Por favor, sube al menos una imagen.'
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = {}

    if (!formData.nombre) {
      formErrors.nombre = 'Por favor, rellena este campo.'
    } else if (/\d/.test(formData.nombre)) {
      formErrors.nombre = 'El nombre no debe contener números.'
    }

    if (!formData.descripcion) {
      formErrors.descripcion = 'Por favor, rellena este campo.'
    } else if (formData.descripcion.length < 10) {
      formErrors.descripcion = 'La descripción debe tener al menos 10 caracteres.'
    }

    if (!formData.imagen) {
      formErrors.imagen = 'Por favor, sube al menos una imagen.'
    }

    if (!formData.categoria) {
      formErrors.categoria = 'Por favor, selecciona una categoría.'
    }

    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setShowAlert(true)

      // Aquí realiza la solicitud para crear la subcategoría
      try {
        await axios.post(endpoints.subcategories, {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          imagen: formData.imagen.file, // Asegúrate de enviar la imagen de manera correcta, puede que necesites un FormData para esto
          categoria: formData.categoria
        })

        setFormData({
          nombre: '',
          descripcion: '',
          imagen: null,
          categoria: ''
        })

        fileInputRef.current.value = ''

        setTimeout(() => {
          setShowAlert(false)
        }, 6000)

        console.log('Form data:', formData)
      } catch (error) {
        console.error('Error creating subcategory:', error)
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="mt-6 text-2xl font-extrabold text-[#2D5651]">Crear subcategoría</h2>
        <form className="w-4/5 max-w-lg m-auto mb-10" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 mt-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="categoria">
                Categoría
              </label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className={`block w-full p-4 border ${
                  errors.categoria ? 'border-red-500' : 'border-gray-300'
                } rounded-lg bg-[#e5e7eb] text-base focus:ring-blue-500 focus:border-blue-500 mb-2`}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoria && (
                <p className="text-red-500 text-xs italic">{errors.categoria}</p>
              )}
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="nombre">
                Nombre
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                  errors.nombre ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                id="nombre"
                type="text"
                placeholder="Nombre de la subcategoría"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs italic">{errors.nombre}</p>
              )}
            </div>
            <div className="w-full px-3 mb-6 mt-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="descripcion">
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
                <p className="text-red-500 text-xs italic">{errors.descripcion}</p>
              )}
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imagen">
                Imagen
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                  errors.imagen ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white mb-2`}
                id="imagen"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {errors.imagen && (
                <p className="text-red-500 text-xs italic">{errors.imagen}</p>
              )}
              {formData.imagen && (
                <div className="relative mt-2">
                  <img
                    src={formData.imagen.url}
                    alt="Imagen seleccionada"
                    className="w-full h-auto rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 mt-1 mr-1"
                    onClick={handleRemoveImage}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>
          {showAlert && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Subcategoría registrada con éxito!</strong>
              <span className="block sm:inline"> Los detalles de la subcategoría han sido guardados.</span>
            </div>
          )}
          <div className="flex justify-center">
            <button className="shadow bg-[#a662bd] hover:bg-purple-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="submit">
              Registrar Subcategoría
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  )
}

export default Subcategory
