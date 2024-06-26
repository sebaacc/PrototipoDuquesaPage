import { useState, useCallback, useEffect, useMemo, Suspense, lazy } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { IoMdClose } from 'react-icons/io' // Import the close icon
import LazyLoad from 'react-lazyload'
import ScrollToTop from '../utils/ScrollToTop' // Cuando se carga la tienda te dirige al inicio de la misma incorporando este componente.
import axios from 'axios'
import endpoints from '../utils/endpoints'
import AddToCart from '../components/Buttons/AddToCart'

const FilterButton = lazy(() => import('../components/FilterButton'))
const PastryModal = lazy(() => import('../components/PastryModal'))

const Tienda = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialSearchTerm = queryParams.get('search') || ''

  const [filter, setFilter] = useState('Todos')
  const [filter2, setFilter2] = useState('')
  const [selectedPastry, setSelectedPastry] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [categories, setCategories] = useState()
  const [subcategories, setSubCategories] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [products, setProducts] = useState([])
  const [products2, setProducts2] = useState([])
  const [subcategories2, setSubcategories2] = useState([])

  const handleFilterChange = useCallback((newFilter) => {
    setSearchTerm('')
    setFilter(newFilter.name)
    setCurrentPage(1)
    setSelectedCategory(newFilter.id)
    console.log(newFilter)
  }, [])

  const handleFilterChange2 = useCallback((newFilter) => {
    setSearchTerm('')
    setFilter2(newFilter.name)
    setCurrentPage(1)
    setSelectedSubCategory(newFilter.id)
    console.log(newFilter)
  }, [])

  const handlePastryClick = useCallback((pastry) => {
    setSelectedPastry(pastry)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedPastry(null)
  }, [])

  const handleItemsPerPageChange = useCallback((event) => {
    setItemsPerPage(parseInt(event.target.value))
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage)
  }, [])

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setFilter('Todos')
    setFilter2('')
    setCurrentPage(1)
    setSelectedSubCategory('')
    setSelectedCategory('')
  }, [])

  useEffect(() => {
    if (subcategories) {
      const filteredSubcategories = subcategories.filter(
        (category) => category.categoryId === selectedCategory
      )

      setSubcategories2(filteredSubcategories)

      if (filteredSubcategories.length > 0) {
        setSelectedSubCategory(filteredSubcategories[0].id)
        setFilter2(filteredSubcategories[0].name)
      } else {
        setSelectedSubCategory(null)
      }
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchPaginatedProducts()
  }, [selectedSubCategory])

  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
    fetchPaginatedProducts()
  }, [])

  useEffect(() => {
    fetchPaginatedProducts()
  }, [itemsPerPage])

  useEffect(() => {
    fetchPaginatedProducts()
  }, [currentPage])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(endpoints.getCategory)
      console.log(response.data)

      if (response.status === 200) {
        console.log(response.data)
        setCategories(response.data)
      } else {
        console.error('Error: Response status is not 200 OK', response.status)
      }
    } catch (error) {
      console.error('Error getting categories:', error)
    }
  }

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(endpoints.getSubcategories)
      console.log(response.data)

      if (response.status === 200) {
        console.log(response.data)
        setSubCategories(response.data)
      } else {
        console.error('Error: Response status is not 200 OK', response.status)
      }
    } catch (error) {
      console.error('Error getting categories:', error)
    }
  }

  const fetchPaginatedProducts = async () => {
    try {
      const response = await axios.get(
        endpoints.getProductPaginate +
          'page=' +
          currentPage +
          '&limit=' +
          itemsPerPage +
          '&subCategoryId=' +
          selectedSubCategory
      )
      console.log(response.data)

      if (response.status === 200) {
        console.log(response.data)
        setProducts(response.data)
        setProducts2(response.data)
      } else {
        console.error('Error: Response status is not 200 OK', response.status)
      }
    } catch (error) {
      console.error('Error getting categories:', error)
    }
  }

  const filteredPastries = useMemo(() => {
    console.log(products)
    setProducts2(
      products.filter((pastry) =>
        pastry.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [filter, searchTerm])

  const totalItems = products.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return (
    <section className="min-h-screen">
      <Navbar />
      <ScrollToTop />
      <div className="px-4 container max-w-6xl mx-auto py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold">Nuestros productos</h1>
            <p className="text-black">
              Explora nuestras deliciosas pastelerías
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {categories &&
              categories.map((type) => (
                <Suspense fallback={<div>Cargando...</div>} key={type.id}>
                  <FilterButton
                    filter={type.name}
                    currentFilter={filter}
                    onClick={() => handleFilterChange(type)}
                  />
                </Suspense>
              ))}
          </div>
          <div>
            <button onClick={clearSearch}>
              REINICIAR CATEGORÍA
            </button>
          </div>
          {/* se muestran las subcategories */}
          <div className="flex flex-wrap items-center gap-4">
            {subcategories2 &&
              subcategories2.map((type) => (
                <Suspense fallback={<div>Cargando...</div>} key={type.id}>
                  <FilterButton
                    filter={type.name}
                    currentFilter={filter2}
                    onClick={() => handleFilterChange2(type)}
                  />
                </Suspense>
              ))}
          </div>
        </div>
        <div className="relative mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Buscar:
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <IoMdClose size={20} className="mt-5" />
              </button>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">
            Items por página:
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="ml-2 shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products2 &&
            products2.map((pastry, index) => (
              <Link to={'/detalle-de-producto/' + pastry.id} key={index}>
                <div
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col justify-between"
                  onClick={() => handlePastryClick(pastry)}
                >
                  <div>
                    <LazyLoad height={200} offset={100}>
                      <img
                        src={pastry.imageURLs[0]}
                        alt={pastry.title}
                        className="h-40 w-full object-cover mb-4 rounded-lg"
                      />
                    </LazyLoad>
                    <h2 className="text-xl font-semibold mb-2">
                      {pastry.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{pastry.description}</p>
                    <p className="text-gray-800 font-bold mb-2">
                      ${pastry.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 font-bold">{pastry.type}</p>
                    <AddToCart product={pastry} selectedValue={1} />
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? 'bg-[#BD6292] text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <Footer />

      {selectedPastry && (
        <Suspense fallback={<div>Cargando...</div>}>
          <PastryModal pastry={selectedPastry} onClose={closeModal} />
        </Suspense>
      )}
    </section>
  )
}

export default Tienda
