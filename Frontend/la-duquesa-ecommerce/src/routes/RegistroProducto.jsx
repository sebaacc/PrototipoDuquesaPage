import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import Loader from '../components/loader/Loader'

function RegistroProducto () {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    cantidadEnStock: '',
    categoria: '',
    subCategoria: '',
    imagenes: []
  })

  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [categories, setCategories] = useState([]) // Estado para las categorías
  const [subCategories, setSubCategories] = useState([]) // Estado para las subcategorías
  const [subCategoriesTwo, setSubCategoriesTwo] = useState([])
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))

    if (id === 'precio' || id === 'cantidadEnStock') {
      if (isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: 'Por favor, introduce un valor numérico válido.'
        }))
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))
      }
    }

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

    if (id === 'categoria') {
      setSubCategoriesTwo(
        subCategories.filter((categorie) => {
          return categorie.categoryId === value
        })
      )
    }
  }

  const handleBlur = (e) => {
    const { id, value } = e.target
    let errorMessage = ''

    if (!value) {
      errorMessage = 'Por favor, rellena este campo.'
    } else if ((id === 'precio' || id === 'cantidadEnStock') && isNaN(value)) {
      errorMessage = 'Por favor, introduce un valor numérico válido.'
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
      newErrors.imagen = ''
    }

    setFormData((prevData) => ({
      ...prevData,
      imagenes: [...prevData.imagenes, ...newImages]
    }))
    setErrors(newErrors)
  }

  const handleRemoveImage = (index) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index)

    const dataTransfer = new DataTransfer()
    newImages.forEach((image) => {
      dataTransfer.items.add(image.file)
    })

    setFormData((prevData) => ({
      ...prevData,
      imagenes: newImages
    }))

    fileInputRef.current.files = dataTransfer.files

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

    if (!formData.cantidadEnStock) {
      formErrors.cantidadEnStock = 'Por favor, rellena este campo.'
    } else if (isNaN(formData.cantidadEnStock)) {
      formErrors.cantidadEnStock =
        'Por favor, introduce un valor numérico válido.'
    }

    if (!formData.categoria) {
      formErrors.categoria = 'Por favor, selecciona una categoría.'
    }

    if (!formData.subCategoria) {
      formErrors.subCategoria = 'Por favor, selecciona una subcategoría.'
    }

    if (formData.imagenes.length === 0) {
      formErrors.imagen = 'Por favor, sube al menos una imagen.'
    }

    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setShowAlert(true)
      createProduct()
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        cantidadEnStock: '',
        categoria: '',
        subCategoria: '',
        imagenes: []
      })

      fileInputRef.current.value = ''

      setTimeout(() => {
        setShowAlert(false)
      }, 6000)

      console.log('Form data:', formData)
    }
  }

  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(endpoints.categories, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setCategories(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
    fetchSubCategories()
  }, [])

  function createProduct () {
    const productData = new FormData()
    productData.append('name', formData.nombre)
    productData.append('description', formData.descripcion)
    productData.append('subCategoryId', formData.subCategoria)
    productData.append('price', formData.precio)
    productData.append('amount', formData.cantidadEnStock)

    formData.imagenes.forEach((imagen) => {
      productData.append('images', imagen.file)
    })

    try {
      axios.post(endpoints.postProduct, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
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

  // subcateogories
  useEffect(() => {
    console.log(formData)
  }, [formData])

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${endpoints.getSubcategories}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSubCategories(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching subcategories:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form className="w-4/5 max-w-lg m-auto mb-10" onSubmit={handleSubmit}>
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
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  id="precio"
                  type="text"
                  placeholder="Precio del producto"
                  value={formData.precio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.precio && (
                <p className="text-red-500 text-xs italic">{errors.precio}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                htmlFor="descripcion"
              >
                Descripción
              </label>
              <textarea
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                  errors.descripcion ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white`}
                id="descripcion"
                rows="4"
                placeholder="Descripción del producto"
                value={formData.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.descripcion && (
                <p className="text-red-500 text-xs italic">
                  {errors.descripcion}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                htmlFor="cantidadEnStock"
              >
                Cantidad en stock
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                  errors.cantidadEnStock ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                id="cantidadEnStock"
                type="text"
                placeholder="Cantidad en stock"
                value={formData.cantidadEnStock}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cantidadEnStock && (
                <p className="text-red-500 text-xs italic">
                  {errors.cantidadEnStock}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                htmlFor="categoria"
              >
                Categoría
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none w-full bg-gray-200 border ${
                    errors.categoria ? 'border-red-500' : 'border-gray-200'
                  } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white`}
                  id="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoria && (
                  <p className="text-red-500 text-xs italic">
                    {errors.categoria}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                htmlFor="subCategoria"
              >
                Subcategoría
              </label>
              <div className="relative">
                <select
                  className={`block appearance-none w-full bg-gray-200 border ${
                    errors.subCategoria ? 'border-red-500' : 'border-gray-200'
                  } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white`}
                  id="subCategoria"
                  value={formData.subCategoria}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formData.categoria === ''}
                >
                  <option value="">Selecciona una subcategoría</option>
                  {subCategoriesTwo.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
                {errors.subCategoria && (
                  <p className="text-red-500 text-xs italic">
                    {errors.subCategoria}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                htmlFor="imagenes"
              >
                Imágenes
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
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
              <div className="flex flex-wrap mt-4">
                {formData.imagenes.map((image, index) => (
                  <div key={index} className="relative mr-4 mb-4">
                    <img
                      src={image.url}
                      alt={`Imagen ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2 focus:outline-none focus:shadow-outline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrar Producto
            </button>
          </div>
        </form>
        {showAlert && (
          <div
            className="bg-green-500 border-t border-b border-green-500 text-white px-4 py-3 fixed bottom-4 right-4 rounded"
            role="alert"
          >
            <p className="font-bold">Producto registrado exitosamente</p>
            <p className="text-sm">
              Se ha registrado el producto correctamente.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default RegistroProducto
