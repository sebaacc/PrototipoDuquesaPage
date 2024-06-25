import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import ScrollToTop from '../utils/ScrollToTop'
import Sugeridos from '../components/Sugeridos'
import SearchProduct from '../components/SearchProduct'
import { MdOutlineTimer } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import ImageGallery from '../components/ImageGallery'

const Detalle = () => {
  const [selectedValue, setSelectedValue] = useState(1)
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${endpoints.getProductById}/${id}`
        )
        console.log(response.data)

        if (response.status === 200) {
          setProduct(response.data)
        } else {
          console.error('Error: Response status is not 200 OK', response.status)
        }
      } catch (error) {
        console.error('Error getting product:', error)
      }
    }
    fetchData()
  }, [])

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
        console.log('se envuio correctamente')
        // mostrar un cartel que diga el producto se a anadido al carrito y un boton que diga "ver el carrito"
      }

      console.log(response.status)
    } catch (error) {
      if (error.response.data === 'The user already has that product added to the cart') {
        // mostrar un cartel que diga el producto se a anadido al carrito y un boton que diga "ver el carrito"
      } else {
        // hubo en error al anadir el producto
      }
      console.error('Error adding to cart:', error)
    }
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  return (
      <>
        <div>
          <ScrollToTop />
          <Navbar />
          <SearchProduct />

          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:flex-1 px-4 sm:w-1/2">
                  {/* <img
                    src="https://duquesabucket.s3.us-east-2.amazonaws.com/product_2274302744944653563.jpeg"
                    alt=""
                  /> */}
                   {product.imageURLs && <ImageGallery images={product.imageURLs}/>}
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                    {product.name}
                  </h2>
                  <Link to={'/tienda?search=Pastel'}>
                    <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                      Pastelería
                    </button>{' '}
                  </Link>
                  <Link to={'/tienda?search=Tarta'}>
                    <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                      Torta Fría
                    </button>
                  </Link>
                  <div className="flex items-center space-x-4 my-4">
                    <div>
                      <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                        <span className="text-black-400 mr-1 mt-1">$</span>
                        <span className="font-bold text-black-600 text-3xl">
                          {product.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-black-500 text-xl font-semibold flex items-center gap-2">
                        <MdOutlineTimer className="text-3xl text-[#BD6292]" />
                        <h5 className="mt-2">20 - 30 min</h5>
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-500"></p>

                  <div className="flex py-4 space-x-4">
                    <div className="relative  ">
                      <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                        Cantidad
                      </div>
                      <select
                        className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-12 h-14 flex items-end pb-1"
                        value={selectedValue}
                        onChange={handleChange}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>

                      <svg
                        className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                      <button
                        type="button"
                        className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#BD6292] hover:bg-[#f187bf] text-white"
                        onClick={addToCart}
                      >
                        Añadir al carrito
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-9 mr-5 mt-12">
            <h1>Descripción</h1>
            <p className="text-gray-500">{product.description}</p>
          </div>
          <Sugeridos />
        </div>
        <Footer />
      </>
  )
}

export default Detalle
