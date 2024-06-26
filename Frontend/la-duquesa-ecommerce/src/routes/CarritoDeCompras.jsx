import { useState, useEffect } from 'react'
import CardCarrito from '../components/CardCarrito'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import bolsaVacia from '../img/Shopping-Bag-1.svg'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import ScrollToTop from '../utils/ScrollToTop'
import { Link } from 'react-router-dom'

function CarritoDeCompras () {
  const [productos, setProductos] = useState([])
  const [animationParent] = useAutoAnimate() // de la librería de auto-animation para animar las cards del carrito.

  const token = localStorage.getItem('accessToken')
  const userId = JSON.parse(localStorage.getItem('user')).sub

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const response = await axios.get(
          `${endpoints.getFromCart}/${userId}`,
          config
        )
        console.log(response.data)

        if (response.status === 200) {
          setProductos(response.data)
        }
      } catch (error) {
        console.error('Error getting productos:', error)
      }
    }
    fetchData()
  }, [])

  const deleteProducts = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const response = await axios.delete(
        `${endpoints.clearCart}/${userId}`,
        config
      )
      console.log(response.data)

      if (response.status === 200) {
        console.log(response.data)
        setProductos([])
      }
    } catch (error) {
      console.error('Error deleting from cart:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="w-4/5 max-w-3xl m-auto mb-10 flex flex-col items-center gap-5">
        <h1 className="text-4xl font-black pl-9 pr-9 sm:text-center">
          Carrito de Compras
        </h1>
        <div
          ref={animationParent}
          className="flex bg-[#F6F6F6] border-2 border-solid border-[#E9E9E9] rounded-xl flex-col w-full"
        >
          {productos.length === 0
            ? (
            <div className=" flex flex-col items-center m-6">
              <h1 className="font-semibold text-[#8B7BB1] text-xl p-2">
                ¡Elige algún producto para tu carrito de productos!
              </h1>
              <img
                className=" max-w-min h-auto object-cover"
                src={bolsaVacia}
                alt="bolsa vacia"
              />
            </div>
              )
            : (
                productos.map((producto, index) => (
              <CardCarrito
                key={index}
                producto={producto}
                setProductos={setProductos}
              />
                ))
              )}
        </div>
        <div className=" flex gap-8">
          <div className="flex justify-center">
            <button
              onClick={deleteProducts}
              className="bg-[#8B7BB1] hover:bg-[#BD6292] text-white font-bold py-2 px-4 rounded mb-8"
            >
              Borrar Lista
            </button>
          </div>
          <div className="flex justify-center">
            <Link
              to={productos.length === 0 ? '#' : '/pagos'}
              onClick={(e) => productos.length === 0 && e.preventDefault()}
              className={productos.length === 0 ? 'cursor-not-allowed' : ''}
            >
              <button
                className={`${
                  productos.length === 0 ? 'bg-gray-400' : 'bg-[#8B7BB1] hover:bg-[#BD6292]'
                } text-white font-bold py-2 px-4 rounded mb-8 shadow transition-colors focus-visible:outline-none focus-visible:ring-1`}
                disabled={productos.length === 0}
              >
                Continuar Compra
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default CarritoDeCompras
