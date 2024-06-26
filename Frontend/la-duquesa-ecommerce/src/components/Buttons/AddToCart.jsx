import axios from 'axios'
import endpoints from '../../utils/endpoints'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AddToCart = ({ product, selectedValue }) => {
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
        // mostrar un cartel que diga el producto se a anadido al carrito y un boton que diga "ver el carrito"
      }

      console.log(response.status)
    } catch (error) {
      if (
        error.response.data ===
        'The user already has that product added to the cart'
      ) {
        // mostrar un cartel que diga el producto se a anadido al carrito y un boton que diga "ver el carrito"
      } else {
        // hubo en error al anadir el producto
      }
      console.error('Error adding to cart:', error)
    }
  }

  return (
    <>
      <Link to={'/carrito-de-compras'}>
        <button
          type="button"
          className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#BD6292] hover:bg-[#f187bf] text-white transition-all duration-150"
          onClick={addToCart}
        >
          Añadir al carrito
        </button>
      </Link>
    </>
  )
}

AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  selectedValue: PropTypes.number.isRequired
}

export default AddToCart
