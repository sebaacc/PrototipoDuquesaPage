import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import bread from '../img/bread.png'
import brownie from '../img/brownie.png'
import cronometro from '../img/cronometro.png'
import Calificacion from '../img/Calificacion.png'
import { useState } from 'react'
import chocoColate from '../img/choco-chocolate 1.png'
import { Link } from 'react-router-dom'

// const Objeto =[
//   {
//     nombre: 'Torta Brownie',
//     descripcion: 'alguna descripcion',
//     img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
//     precio: '62000',
//     cantidad: 1
//   }]

const Detalle = () => {
  const [image, setImage] = useState(1)
  return (
    <>
      <div>
        <Navbar />
        <div className="m-10 md:flex justify-center">
          <input
            className="border p-3 rounded-lg w-[330px] h-[60px] bg-[#D9D9D9] text-black font-medium sm:w-[560px] md:w-[600px] lg:w-[630px] xl:w-[1000px]"
            type="text"
            placeholder="Busca un producto..."
            id="search-product"
          />
        </div>
        <div className="bg-white shadow-sm top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
            <div className="flex items-center justify-between md:justify-start">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="md:block w-20 h-12 flex justify-center items-center"
                >
                  <img
                    src={Calificacion}
                    alt="calification"
                    className="rounded-lg mx-auto w-20 h-12"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                {/**/}

                <div>
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                    {image === 1 && (
                      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                        <span className="text-5xl">
                          <img src={chocoColate} />
                        </span>
                      </div>
                    )}
                    {image === 2 && (
                      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                        <span className="text-5xl">
                          <img src={brownie} />
                        </span>
                      </div>
                    )}
                    {image === 3 && (
                      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                        <span className="text-5xl">3</span>
                      </div>
                    )}
                    {image === 4 && (
                      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                        <span className="text-5xl">4</span>
                      </div>
                    )}
                  </div>

                  <div className="flex -mx-2 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex-1 px-2">
                        <button
                          onClick={() => setImage(i)}
                          className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                            image === i
                              ? 'ring-2 ring-indigo-300 ring-inset'
                              : ''
                          }`}
                        >
                          <span className="text-2xl">{i}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/**/}
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                  Torta de Chocolate.
                </h2>
                <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                  Pastelería
                </button>
                <button className="mr-6 w-28 p-3 bg-[#BD6292] text-white rounded-xl">
                  Torta Fría
                </button>

                <div className="flex items-center space-x-4 my-4">
                  <div>
                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                      <span className="text-black-400 mr-1 mt-1">$</span>
                      <span className="font-bold text-black-600 text-3xl">
                        14.000
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-black-500 text-xl font-semibold flex">
                      <img
                        src={cronometro}
                        alt="cronometro"
                        className="size-10"
                      />
                      <h5 className="mt-2">20 - 30 min</h5>
                    </p>
                  </div>
                </div>

                <p className="text-gray-500"></p>

                <div className="flex py-4 space-x-4">
                  <div className="relative">
                    <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                      Qty
                    </div>
                    <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
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
                  <Link to={'/carrito-de-compras'}>
                    <button
                      type="button"
                      className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      Añadir al carrito
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-5 mr-5 mt-12">
          <h1>Descripción</h1>
          <p className="text-gray-500">
            ¡Deléitate con nuestra deliciosa y esponjosa torta de chocolate!
            Elaborada con los mejores ingredientes, nuestro postre es perfecto
            para satisfacer tus antojos de chocolate. Disfruta de cada bocado
            lleno de sabor y textura irresistible. ¡No te pierdas la oportunidad
            de probar nuestra exquisita torta de chocolate y endulza tus
            momentos especiales con nosotros!
          </p>
        </div>

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
                  Ahorra el 10% llevando mas de 10 unidades en cualquier postre
                  !!
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
      <Footer />
    </>
  )
}

export default Detalle
