import { useState } from 'react'
import CardCarrito from '../components/CardCarrito'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import bolsaVacia from '../img/Shopping-Bag-1.svg'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const listaProductos = [
  {
    nombre: 'Torta de chocolate',
    descripcion: 'alguna descripcion',
    img: 'src/img/choco-chocolate 1.png',
    precio: '14000',
    cantidad: 1
  },
  {
    nombre: 'Croissant',
    descripcion: 'alguna descripcion',
    img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
    precio: '3800',
    cantidad: 3
  },
  {
    nombre: 'Cupcake de Naranja con crocante',
    descripcion: 'alguna descripcion',
    img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
    precio: '5000',
    cantidad: 2
  }
]
function CarritoDeCompras () {
  const [productos, setProductos] = useState(listaProductos)
  const [animationParent] = useAutoAnimate() // de la librería de auto-animation para animar las cards del carrito.
  const deleteProducts = () => {
    setProductos([])
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
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
            <button className="bg-[#8B7BB1] hover:bg-[#BD6292] text-white font-bold py-2 px-4 rounded mb-8 shadow transition-colors focus-visible:outline-none focus-visible:ring-1">
              Continuar Compra
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CarritoDeCompras
