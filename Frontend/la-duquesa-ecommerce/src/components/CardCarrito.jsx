import PropTypes from 'prop-types'
import { useState } from 'react'
import { priceFormatter } from '../utils/PriceFormatter'
import axios from 'axios'
import endpoints from '../utils/endpoints'
function CardCarrito ({ producto, setProductos }) {
  const { name, imageURLs, price, amount } = producto
  // Define el estado para el valor seleccionado del select
  const [selectedValue, setSelectedValue] = useState('opcion2') // Valor por defecto

  const precioFormateado = priceFormatter(price * amount)

  const token = localStorage.getItem('accessToken')
  const userId = JSON.parse(localStorage.getItem('user')).sub

  // Maneja el cambio del valor seleccionado del "select" de cantidad
  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    const newQuantity = parseInt(event.target.value, 10)
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.name === producto.name ? { ...p, cantidad: newQuantity } : p
      )
    )
    console.log('valor seleccionado' + selectedValue)
  }

  // Maneja la eliminación del producto
  // const handleDelete = () => {
  //   setProductos((prevProductos) =>
  //     prevProductos.filter((p) => p.name !== producto.name)
  //   )
  // }

  const handleDelete = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const response = await axios.delete(`${endpoints.deleteFromCart}/${userId}/${producto.id}`, config)
      console.log(response.data)

      if (response.status === 200) {
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error deleting from cart:', error)
    }
  }

  return (
    <>
      <div className="relative w-11/12 flex m-auto mt-5 mb-5 border-2 border-[#D1D1D1] rounded-xl">
        <img
          className="w-2/4 rounded-l-xl object-cover"
          src={imageURLs[0]}
          alt={name}
        />
        <span className="w-2/4 bg-[#D9D9D9] rounded-r-xl p-3 flex flex-col justify-center max-md:items-start lg:items-center">
          <p className="font-bold mb-3">{name}</p>
          <div className="flex max-sm:flex-col lg:flex-row items-center">
            <p className="font-light mr-2">Cantidad:</p>

            <select
              className="py-1 px-1 border border-[#2D5651] mr-6 focus:outline-none rounded text-lg text-center"
              value={producto.amount}
              onChange={handleChange}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <p className="mb-4 mt-4 text-[#2D5651] font-normal font-sans">
            ${precioFormateado}
          </p>
          <div className="flex gap-2">
            <p className="font-light">Envío:</p>
            <span className="text-[#2D5651] font-semibold">Gratis</span>
          </div>
        </span>
        <button
          className="absolute top-2 right-2 bg-[#2f2f2f] text-white rounded-full w-6 h-6 flex items-center justify-center"
          onClick={handleDelete}
        >
          ✕
        </button>
      </div>
    </>
  )
}

// Validación de tipos de props
CardCarrito.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageURLs: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired,
  setProductos: PropTypes.func.isRequired
}

export default CardCarrito
