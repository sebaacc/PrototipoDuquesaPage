import { useState } from 'react'
import axios from 'axios'
import endpoints from '../../utils/endpoints'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AddToCart = ({ product, selectedValue }) => {
  const [isAdded, setIsAdded] = useState(false)
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false)

  async function addToCart () {
    console.log('prueba')
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(
        endpoints.postToCart,
        {
          client: JSON.parse(localStorage.getItem('user')).sub,
          product: product.id,
          quantity: selectedValue
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        console.log('se envió correctamente')
        setIsAdded(true)
        setIsAlreadyInCart(false)
      }

      console.log(response.status)
    } catch (error) {
      if (
        error.response.data ===
        'The user already has that product added to the cart'
      ) {
        setIsAlreadyInCart(true)
        setIsAdded(false)
      } else {
        console.error('Error adding to cart:', error)
        setIsAdded(false)
        setIsAlreadyInCart(false)
      }
    }
  }

  return (
    <>
      <button
        type="button"
        className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#BD6292] hover:bg-[#f187bf] text-white"
        onClick={addToCart}
      >
        Añadir al carrito
      </button>
      {isAdded && (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-xl shadow-lg">
          <p>Producto añadido al carrito correctamente</p>
          <Link to={'/carrito-de-compras'}>
            <button className="mt-2 px-4 py-2 bg-white text-green-500 rounded-md">
              Ver el carrito
            </button>
          </Link>
        </div>
      )}
      {isAlreadyInCart && (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-red-500 text-white rounded-xl shadow-lg">
          <p>Este producto ya existe en el carrito</p>
          <Link to={'/carrito-de-compras'}>
            <button className="mt-2 px-4 py-2 bg-white text-red-500 rounded-md">
              Ver el carrito
            </button>
          </Link>
        </div>
      )}
    </>
  )
}

AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  selectedValue: PropTypes.number.isRequired
}

export default AddToCart
