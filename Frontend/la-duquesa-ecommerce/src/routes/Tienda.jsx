import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import croissant from '../img/productos/croissant.jpg'
import galletaChocolate from '../img/productos/galleta-chispas-chocolate.jpg'
import galletaMani from '../img/productos/galleta-mani.jpg'
import galletaAvena from '../img/productos/galletas-avena.jpg'
import galletaJenjibre from '../img/productos/galletas-jengibre.jpg'
import macaronsFrambuesa from '../img/productos/macarons-de-frambuesa.jpg'
import muffinsArandanos from '../img/productos/muffins-arandanos.jpg'
import panPlatano from '../img/productos/pan-de-platano.jpg'
import pastelTercipelo from '../img/productos/pastel-terciopelo-rojo.jpg'
import pastelZanahoria from '../img/productos/pastel-zanahoria.jpg'
import tartaArandanos from '../img/productos/tarta-de-arandanos.jpg'
import tartaDurzano from '../img/productos/tarta-de-durazno.jpg'
import tartaMora from '../img/productos/tarta-moras.jpg'
import tartaQueso from '../img/productos/tarta-queso.jpg'
import tortaFresa from '../img/productos/tortaDeFresas.jpg'
import tartaLimon from '../img/productos/tortaDeLimon.jpg'
import tartaManzana from '../img/productos/tarta-manzana.jpg'
import eclairVainilla from '../img/productos/eclair-vainilla.jpg'
import profiteroles from '../img/productos/profiteroles.jpg'
import pastelChocolate from '../img/productos/pastel-cocolate.jpg'
import { CiShoppingCart } from 'react-icons/ci'
import { useState } from 'react'

const Tienda = () => {
  const [filter, setFilter] = useState('Todos')
  const [selectedPastry, setSelectedPastry] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const handlePastryClick = (pastry) => {
    setSelectedPastry(pastry)
  }

  const closeModal = () => {
    setSelectedPastry(null)
  }

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value))
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleAddToCart = (pastry) => {
    setCart([...cart, pastry])
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const filteredPastries = pastries
    .filter((pastry) =>
      filter === 'Todos' ? true : pastry.type === filter
    )
    .filter((pastry) =>
      pastry.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const totalItems = filteredPastries.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPastries = filteredPastries.slice(startIndex, endIndex)

  return (
    <section className="min-h-screen">
      <Navbar />
      <div className="px-4 container max-w-6xl mx-auto py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 ">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold">Nuestros productos</h1>
            <p className="text-black">
              Explora nuestras deliciosas pastelerías
            </p>
          </div>

          <div className="flex items-center gap-4">
            <FilterButton
              filter="Todos"
              currentFilter={filter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="Pastel"
              currentFilter={filter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="Galleta"
              currentFilter={filter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="Tarta"
              currentFilter={filter}
              onClick={handleFilterChange}
            />
            <FilterButton
              filter="Pastelería"
              currentFilter={filter}
              onClick={handleFilterChange}
            />
            <select
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
            </select>
          </div>
        </div>
        <article className="mb-6 text-white flex justify-end">
          <input
            className="bg-[#CE76A4] text-white w-1/3 p-2 border-none rounded-lg placeholder:text-white"
            placeholder="Encuentra tus productos..."
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </article>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPastries.map((pastry, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
              onClick={() => handlePastryClick(pastry)}
            >
              <img
                src={pastry.image}
                alt={pastry.title}
                width="500"
                height="400"
                className="object-cover w-full h-64"
                style={{ aspectRatio: '500 / 400', objectFit: 'cover' }}
              />
              <div className="bg-white p-4">
                <h3 className="font-bold text-xl">{pastry.title}</h3>
                <p className="text-sm text-gray-500">{pastry.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(pastry)
                  }}
                  className="mt-2 px-4 py-2 bg-[#BD6292] text-white rounded flex items-center justify-center hover:bg-[#CE76A4]"
                >
                  <span>
                    <CiShoppingCart className="size-6 mr-2" />
                  </span>
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <nav
            aria-label="pagination"
            className="mx-auto flex w-full justify-center"
            role="navigation"
          >
            <ul className="flex flex-row items-center gap-1">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                  aria-label="Go to previous page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  <span>Anterior</span>
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                      currentPage === index + 1
                        ? 'border border-input bg-background'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    } h-10 w-10`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                  aria-label="Go to next page"
                >
                  <span>Siguiente</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {selectedPastry && (
          <PastryModal pastry={selectedPastry} onClose={closeModal} />
        )}
      </div>
      <Footer />
    </section>
  )
}

const FilterButton = ({ filter, currentFilter, onClick }) => (
  <button
    onClick={() => onClick(filter)}
    className={`px-4 py-2 rounded ${
      filter === currentFilter
        ? 'bg-[#BD6292] text-white'
        : 'bg-gray-200 text-gray-700'
    }`}
  >
    {filter}
  </button>
)

const PastryModal = ({ pastry, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{pastry.title}</h2>
      <img
        src={pastry.image}
        alt={pastry.title}
        width="500"
        height="400"
        className="object-cover w-full h-64 mb-4"
        style={{ aspectRatio: '500 / 400', objectFit: 'cover' }}
      />
      <p className="mb-4">{pastry.description}</p>
      <button
        onClick={() => onClose()}
        className="px-4 py-2 bg-[#BD6292] text-white rounded m-auto flex hover:bg-[#CE76A4]"
      >
        Cerrar
      </button>
    </div>
  </div>
)

const pastries = [
  {
    title: 'Pastel de Chocolate',
    description: 'Pastel de chocolate decadente con rico glaseado',
    type: 'Pastel',
    image: pastelChocolate
  },
  {
    title: 'Tarta de Fresas',
    description: 'Tarta ligera y esponjosa con fresas frescas',
    type: 'Pastel',
    image: tortaFresa
  },
  {
    title: 'Galletas de Mantequilla de Maní',
    description:
      'Galletas de mantequilla de maní masticables con un toque de sal',
    type: 'Galleta',
    image: galletaMani
  },
  {
    title: 'Tarta de Manzana',
    description:
      'Tarta de manzana clásica hecha en casa con una corteza hojaldrada',
    type: 'Tarta',
    image: tartaManzana
  },
  {
    title: 'Croissant',
    description: 'Croissant estilo francés, mantecoso y hojaldrado',
    type: 'Pastelería',
    image: croissant
  },
  {
    title: 'Tarta de Limón',
    description:
      'Tarta de limón con una corteza crujiente de galleta de mantequilla',
    type: 'Pastelería',
    image: tartaLimon
  },
  {
    title: 'Galletas con Chispas de Chocolate',
    description: 'Galletas suaves y masticables con chispas de chocolate',
    type: 'Galleta',
    image: galletaChocolate
  },
  {
    title: 'Pastel de Terciopelo Rojo',
    description:
      'Pastel de terciopelo rojo húmedo y rico con glaseado de queso crema',
    type: 'Pastel',
    image: pastelTercipelo
  },
  {
    title: 'Tarta de Arándanos',
    description: 'Tarta de arándanos jugosa con una corteza hojaldrada',
    type: 'Tarta',
    image: tartaArandanos
  },
  {
    title: 'Eclair de Vainilla',
    description:
      'Eclair relleno de crema de vainilla y cubierto con glaseado de chocolate',
    type: 'Pastelería',
    image: eclairVainilla
  },
  {
    title: 'Macarons de Frambuesa',
    description: 'Macarons ligeros y crujientes con relleno de frambuesa',
    type: 'Pastelería',
    image: macaronsFrambuesa
  },
  {
    title: 'Muffin de Arándanos',
    description: 'Muffin esponjoso con arándanos frescos',
    type: 'Pastelería',
    image: muffinsArandanos
  },
  {
    title: 'Tarta de Queso',
    description: 'Tarta de queso cremosa con base de galleta graham',
    type: 'Tarta',
    image: tartaQueso
  },
  {
    title: 'Pan de Plátano',
    description: 'Pan de plátano húmedo con nueces',
    type: 'Pastelería',
    image: panPlatano
  },
  {
    title: 'Pastel de Zanahoria',
    description: 'Pastel de zanahoria húmedo con glaseado de queso crema',
    type: 'Pastel',
    image: pastelZanahoria
  },
  {
    title: 'Galletas de Avena',
    description: 'Galletas crujientes de avena con pasas',
    type: 'Galleta',
    image: galletaAvena
  },
  {
    title: 'Tarta de Moras',
    description: 'Tarta de moras frescas con corteza dorada',
    type: 'Tarta',
    image: tartaMora
  },
  {
    title: 'Profiteroles',
    description:
      'Bolas de masa rellenas de crema pastelera y cubiertas con chocolate',
    type: 'Pastelería',
    image: profiteroles
  },
  {
    title: 'Galletas de Jengibre',
    description: 'Galletas de jengibre especiadas y crujientes',
    type: 'Galleta',
    image: galletaJenjibre
  },
  {
    title: 'Tarta de Durazno',
    description: 'Tarta de durazno jugosa con corteza hojaldrada',
    type: 'Tarta',
    image: tartaDurzano
  }
]

export default Tienda
