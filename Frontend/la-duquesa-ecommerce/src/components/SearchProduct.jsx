import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <form onSubmit={handleSearch}>
          <input
            className="border p-4 rounded-lg w-[330px] h-[80px] bg-[#D9D9D9] text-black font-medium sm:w-[560px] md:w-[600px] lg:w-[630px] xl:w-[1000px]"
            type="text"
            placeholder="Busca un producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-product"
          />
          <button type="submit" className="hidden">
            Buscar
          </button>
        </form>
      </div>
    </>
  )
}

export default SearchProduct
