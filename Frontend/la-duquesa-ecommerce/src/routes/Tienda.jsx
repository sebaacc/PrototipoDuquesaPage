import { useState, useCallback, useMemo, Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CiShoppingCart } from 'react-icons/ci'
import LazyLoad from 'react-lazyload'
import pastries from '../data/pastries'

const FilterButton = lazy(() => import('../components/FilterButton'))
const PastryModal = lazy(() => import('../components/PastryModal'))

const Tienda = () => {
  const [filter, setFilter] = useState('Todos')
  const [selectedPastry, setSelectedPastry] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredPastries = useMemo(() => {
    return pastries
      .filter((pastry) => (filter === 'Todos' ? true : pastry.type === filter))
      .filter((pastry) => pastry.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <p className="text-black">Explora nuestras deliciosas pastelerías</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {['Todos', 'Pastel', 'Galleta', 'Tarta', 'Pastelería'].map((type) => (
              <Suspense fallback={<div>Cargando...</div>} key={type}>
                <FilterButton
                  filter={type}
                  currentFilter={filter}
                  onClick={handleFilterChange}
                />
              </Suspense>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Buscar:
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => handlePastryClick(pastry)}
            >
              <LazyLoad height={200} offset={100}>
                <img
                  src={pastry.image}
                  alt={pastry.title}
                  className="h-40 w-full object-cover mb-4 rounded-lg"
                />
              </LazyLoad>
              <h2 className="text-xl font-semibold mb-2">{pastry.title}</h2>
              <p className="text-gray-600 mb-2">{pastry.description}</p>
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
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  page === currentPage ? 'bg-[#BD6292] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
        {selectedPastry && (
          <Suspense fallback={<div>Cargando...</div>}>
            <PastryModal pastry={selectedPastry} closeModal={closeModal} />
          </Suspense>
        )}
      </div>
      <Footer />
    </section>
  )
}

export default Tienda
