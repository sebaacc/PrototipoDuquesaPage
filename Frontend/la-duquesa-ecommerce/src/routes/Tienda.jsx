import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import chocolate from '../img/choco-chocolate 1.png'
import brownie from '../img/brownie.png'
import cake from '../img/cake-2.jpg'
import bread from '../img/bread.png'

const products = [
  {
    id: 1,
    title: 'Pastel de chocolate',
    description: 'Delicioso pastel de chocolate con relleno de crema',
    category: 'Pasteles',
    image: `${chocolate}`
  },
  {
    id: 2,
    title: 'Tarta de manzana',
    description: 'Tarta de manzana con canela y azúcar',
    category: 'Tartas',
    image: `${brownie}`
  },
  {
    id: 3,
    title: 'Galletas de avena',
    description: 'Galletas de avena con chispas de chocolate',
    category: 'Galletas',
    image: `${cake}`
  },
  {
    id: 4,
    title: 'Cupcakes de vainilla',
    description: 'Cupcakes de vainilla con glaseado de crema',
    category: 'Pasteles',
    image: `${cake}`
  },
  {
    id: 5,
    title: 'Pie de limón',
    description: 'Delicioso pie de limón con merengue',
    category: 'Tartas',
    image: `${bread}`
  },
  {
    id: 6,
    title: 'Macarons de frambuesa',
    description: 'Macarons de frambuesa con relleno de crema',
    category: 'Galletas',
    image: `${brownie}`
  },
  {
    id: 7,
    title: 'Pastel de zanahoria',
    description: 'Pastel de zanahoria con nueces y crema de queso',
    category: 'Pasteles',
    image: `${chocolate}`
  },
  {
    id: 8,
    title: 'Tarta de queso',
    description: 'Tarta de queso con base de galleta',
    category: 'Tartas',
    image: `${cake}`
  },
  {
    id: 9,
    title: 'Galletas de mantequilla',
    description: 'Galletas de mantequilla con chispas de chocolate',
    category: 'Galletas',
    image: `${brownie}`
  }
]

const ProductList = () => {
  const [filter, setFilter] = useState('Todos')
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const filteredProducts =
    filter === 'Todos'
      ? products
      : products.filter((product) => product.category === filter)

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num)
    setDropdownOpen(false)
  }

  return (
    <div className="container mx-auto">
        <Navbar />
      <h1 className="text-4xl flex text-center justify-center">
        Nuestros productos
      </h1>
      <div className="flex flex-col md:flex-row items-start gap-8 p-8">
        <div className="w-full md:w-1/4 bg-[#BD6292] p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Filtros</h2>
          <div className="grid gap-2">
            {['Todos', 'Pasteles', 'Tartas', 'Galletas'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`bg-white focus:bg-[#cdbafa] rounded disabled:opacity-50 h-10 px-4 py-2 ${
                  filter === category
                    ? 'bg-background text-accent-foreground'
                    : 'border-white border-input hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="items-per-page"
            >
              Mostrar
            </label>
            <div className="relative">
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:r4:"
                aria-expanded={dropdownOpen ? 'true' : 'false'}
                aria-autocomplete="none"
                dir="ltr"
                data-state={dropdownOpen ? 'open' : 'closed'}
                className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm w-24 bg-[#cdbafa]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span style={{ pointerEvents: 'none' }}>
                  {itemsPerPage} por página
                </span>
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
                  className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-input rounded-md shadow-lg">
                  {[6, 12, 18].map((num) => (
                    <li
                      key={num}
                      className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground hover:bg-[#cdbafa]"
                      onClick={() => handleItemsPerPageChange(num)}
                    >
                      {num} por página
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.slice(0, itemsPerPage).map((product) => (
            <div
              key={product.id}
              className="bg-[#8B7BB1] rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: '400 / 300', objectFit: 'cover' }}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-white mt-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductList
