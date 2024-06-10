import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import bread from '../img/bread.png'
import brownie from '../img/brownie.png'
import cronometro from '../img/cronometro.png'
import Calificacion from '../img/Calificacion.png'
import chocolate from '../img/choco-chocolate 1.png'
import { Link } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery'
import ScrollToTop from '../utils/ScrollToTop'
import Sugeridos from '../components/Sugeridos'
import SearchProduct from '../components/SearchProduct'

// const Objeto =[
//   {
//     nombre: 'Torta Brownie',
//     descripcion: 'alguna descripcion',
//     img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
//     precio: '62000',
//     cantidad: 1
//   }]

const Detalle = () => {
  // const [image, setImage] = useState(1)
  const images = [chocolate, brownie, chocolate, brownie, chocolate, brownie]
  return (
    <>
      <div>
        <ScrollToTop />
        <Navbar />
        <SearchProduct />
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
            <div className="flex flex-col md:flex-row">
              <div className="md:flex-1 px-4 sm:w-1/2">
                <ImageGallery images={images} />
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
                  <div className="relative  ">
                    <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                      Cantidad
                    </div>
                    <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-12 h-14 flex items-end pb-1">
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

        <div className="ml-9 mr-5 mt-12">
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
        <Sugeridos />
      </div>
      <Footer />
    </>
  )
}

export default Detalle
