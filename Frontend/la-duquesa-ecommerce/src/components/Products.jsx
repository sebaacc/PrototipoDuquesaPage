import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sugeridos from './Sugeridos'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import endpoints from '../utils/endpoints'
import axios from 'axios'

function Products () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(endpoints.getProduct)
        setProducts(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 900
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="mb-12 lg:flex flex-col justify-center xl:p-16">
      <span className="flex md:ml-8 mt-3 items-center max-md:justify-center">
        <h3 className="mr-2 font-black text-2xl">Productos populares</h3>
        <Link to={'/tienda'}>
          <p className="ml-12 font-bold text-[#BD6292] hover:text-[#BD6292]">
            Ver todos
          </p>
        </Link>
      </span>
      <section className="ml-10 mt-8">
        <Slider {...settings} className="carousel">
          {products.map((product) => (
            <article key={product.id} className="p-4 mb-2">
              <div className="bg-[#f8f8f8] p-4 rounded-2xl shadow-lg h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={product.imageURLs[0]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 rounded-b-2xl h-full flex flex-col justify-between">
                  <div>
                    <p className="font-black capitalize">{product.name}</p>
                    <span className="flex mt-2">
                      <p className="mr-6 text-gray-500 font-bold">
                        Envío gratis
                      </p>
                      <p className="text-gray-500 font-bold">40 - 50 min</p>
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link to={product.detailLink}>
                      <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl hover:bg-[#df75ae] hover:shadow-sm transition-all duration-300">
                        Información
                      </button>
                    </Link>
                    <button className="p-3 w-28 bg-[#BD6292] text-white rounded-xl capitalize pointer-events-none">
                      {product.type}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Slider>
      </section>
      {/* Sugeridos */}
      <Sugeridos />
    </div>
  )
}

export default Products
