import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/tienda?search=${searchTerm}`)
  }

  return (
    <>
      <div className="m-10 md:flex justify-center">
        <form onSubmit={handleSearch} className="relative w-full max-w-4xl">
          <input
            className="border border-[#D9D9D9] p-4 rounded-2xl w-full h-[80px] bg-[#F3F3F3] text-black font-medium pl-12 outline-none shadow-sm hover:shadow-md transition-all duration-150"
            type="text"
            placeholder="Busca un producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-product"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
          >
            <FaSearch className="text-[#808080]" />
          </button>
        </form>
      </div>
    </>
  )
}

export default SearchProduct
