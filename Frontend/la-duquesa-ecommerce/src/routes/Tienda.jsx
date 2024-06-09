import { useState, useCallback, useMemo, Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CiShoppingCart } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io' // Import the close icon
import LazyLoad from 'react-lazyload'
import pastries from '../data/pastries'

const FilterButton = lazy(() => import('../components/FilterButton'))
const PastryModal = lazy(() => import('../components/PastryModal'))

const Tienda = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialSearchTerm = queryParams.get('search') || ''

  const [filter, setFilter] = useState('Todos')
  const [selectedPastry, setSelectedPastry] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
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

  const handleAddToCart = useCallback((pastry) => {
    setCart((prevCart) => [...prevCart, pastry])
  }, [])

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setFilter('Todos')
    setCurrentPage(1)
  }, [])

  const filteredPastries = useMemo(() => {
    return pastries
      .filter((pastry) => (filter === 'Todos' ? true : pastry.type === filter))
      .filter((pastry) =>
        pastry.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  }, [filter, searchTerm])

  const totalItems = filteredPastries.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPastries = filteredPastries.slice(startIndex, endIndex)

  return (
    <section className="min-h-screen">
      <Navbar />
      <div className="px-4 container max-w-6xl mx-auto py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold">Nuestros productos</h1>
            <p className="text-black">
              Explora nuestras deliciosas pastelerías
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {['Todos', 'Pastel', 'Galleta', 'Tarta', 'Pastelería'].map(
              (type) => (
                <Suspense fallback={<div>Cargando...</div>} key={type}>
                  <FilterButton
                    filter={type}
                    currentFilter={filter}
                    onClick={handleFilterChange}
                  />
                </Suspense>
              )
            )}
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
                <IoMdClose size={20} />
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
          {currentPastries.map((pastry, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col justify-between"
              onClick={() => handlePastryClick(pastry)}
            >
              <div>
                <LazyLoad height={200} offset={100}>
                  <img
                    src={pastry.image}
                    alt={pastry.title}
                    className="h-40 w-full object-cover mb-4 rounded-lg"
                  />
                </LazyLoad>
                <h2 className="text-xl font-semibold mb-2">{pastry.title}</h2>
                <p className="text-gray-600 mb-2">{pastry.description}</p>
                <p className="text-gray-800 font-bold mb-2">
                  ${pastry.price.toLocaleString()}
                </p>{' '}
              </div>
              {/* Mostrar el precio */}
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold">{pastry.type}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(pastry)
                  }}
                  className="bg-[#BD6292] text-white px-4 py-2 rounded-lg shadow-md"
                >
                  <CiShoppingCart className="inline-block mr-1" />
                  Agregar al carrito
                </button>
              </div>
            </div>
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
