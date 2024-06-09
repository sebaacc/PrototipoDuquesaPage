import chocoColate from '../img/choco-chocolate 1.png'
import { Link } from 'react-router-dom'
import Sugeridos from './Sugeridos'

function Products () {
  return (
    <div className="mb-12 lg:flex flex-col justify-center xl:p-16">
      <span className="flex md:ml-8 mt-3 items-center max-md:justify-center">
        <h3 className="mr-2 font-black text-2xl">Productos populares</h3>
        <Link to={'/tienda'}>
          <p className="ml-12 font-bold text-[#BD6292 hover:text-[#BD6292]">
            Ver todos
          </p>
        </Link>
      </span>
      <section className="flex ml-10 mt-8 justify-around">
        <article className="mr-10">
          <img src={chocoColate} alt="torta de chocolate" />
          <div className="bg-[#D9D9D9] p-6 rounded-b-2xl">
            <p className="font-black">torta de chocolate</p>
            <span className="flex">
              <p className="mr-6 text-gray-500 font-bold">Envío gratis</p>
              <p className="text-gray-500 font-bold">20 - 30 min</p>
            </span>
            <span className="mt-4 block">
              <Link to="/detalle-de-producto/1">
                <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                  Información
                </button>
              </Link>
              <button className="p-3 w-28 bg-[#BD6292] text-white rounded-xl">
                Torta fría
              </button>
            </span>
          </div>
        </article>
        <article className="mr-10 hidden md:block">
          <img src={chocoColate} alt="torta de chocolate" />
          <div className="bg-[#D9D9D9] p-6 rounded-b-2xl">
            <p className="font-black">torta de chocolate</p>
            <span className="flex">
              <p className="mr-6 text-gray-500 font-bold">Envío gratis</p>
              <p className="text-gray-500 font-bold">20 - 30 min</p>
            </span>
            <span className="mt-4 block">
              <Link to="/detalle-de-producto/2">
                <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                  Información
                </button>
              </Link>
              <button className="p-3 w-28 bg-[#BD6292] text-white rounded-xl">
                Torta fría
              </button>
            </span>
          </div>
        </article>
        <article className="mr-10 hidden xl:block">
          <img src={chocoColate} alt="torta de chocolate" />
          <div className="bg-[#D9D9D9] p-6 rounded-b-2xl">
            <p className="font-black">torta de chocolate</p>
            <span className="flex">
              <p className="mr-6 text-gray-500 font-bold">Envío gratis</p>
              <p className="text-gray-500 font-bold">20 - 30 min</p>
            </span>
            <span className="mt-4 block">
              <Link to="/detalle-de-producto/3">
                <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                  Información
                </button>
              </Link>
              <button className="p-3 w-28 bg-[#BD6292] text-white rounded-xl">
                Torta fría
              </button>
            </span>
          </div>
        </article>
      </section>
      {/* Sugeridos */}
      <Sugeridos />
    </div>
  )
}

export default Products
