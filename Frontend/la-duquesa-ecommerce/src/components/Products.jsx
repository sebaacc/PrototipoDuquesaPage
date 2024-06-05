import chocoColate from '../img/choco-chocolate 1.png'
import bread from '../img/bread.png'
import brownie from '../img/brownie.png'
import { Link } from 'react-router-dom'

function Products () {
  return (
    <div className="mb-12 lg:flex flex-col justify-center xl:p-16">
      <span className="flex ml-8 mt-3 items-center">
        <h3 className="mr-2 font-black text-2xl">Productos populares</h3>
        <p className="ml-12 font-bold text-[#BD6292]">Ver todos</p>
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
      <section className="ml-3 mt-12 p-6">
        <article className="hidden xl:flex flex-row mb-6">
          <h4 className="mr-6">Sugeridos</h4>
          <p className="font-bold text-[#BD6292]">Ver todos</p>
        </article>
        <div className="md:flex lg:flex flex-row">
          <article className="flex mb-10 md:mr-6 lg:mr-8">
            <img
              className="w-48 rounded-l-xl object-cover"
              src={brownie}
              alt="brownie"
            />
            <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
              <p className="font-bold mb-3">
                Planea tu fiesta de la manera mas dulce.
              </p>
              <p className="mb-4">
                Ahorra el 10% llevando mas de 10 unidades en cualquier postre !!
              </p>
              <button className="border-2 border-black w-32">
                Busca tu oferta
              </button>
            </span>
          </article>
          <article className="flex mb-10 lg:min-h-52">
            <img
              className="w-48 rounded-l-xl object-cover"
              src={bread}
              alt="bread"
            />
            <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
              <p className="font-bold mb-3">
                Planea tu fiesta de la manera más dulce.
              </p>
              <p className="mb-4">
                Aprovecha nuestro delicioso pan brioche, 100% artesanal.
              </p>
              <button className="border-2 border-black w-32">
                Busca tu oferta
              </button>
            </span>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Products
