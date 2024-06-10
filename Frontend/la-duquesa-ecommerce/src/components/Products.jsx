import React from 'react'
import { Link } from 'react-router-dom'
import Sugeridos from './Sugeridos'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import products from '../data/productsData' // Asegúrate de que la ruta sea correcta

function Products () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
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
            <article key={product.id} className="p-4">
              <div className="bg-white p-4 rounded-2xl shadow-lg h-full">
                <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                </div>
                <div className="bg-[#D9D9D9] p-6 rounded-b-2xl h-full flex flex-col justify-between">
                  <div>
                    <p className="font-black">{product.name}</p>
                    <span className="flex mt-2">
                      <p className="mr-6 text-gray-500 font-bold">{product.shipping}</p>
                      <p className="text-gray-500 font-bold">{product.deliveryTime}</p>
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link to={product.detailLink}>
                      <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                        Información
                      </button>
                    </Link>
                    <button className="p-3 w-28 bg-[#BD6292] text-white rounded-xl">
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
