import { useState } from 'react'
import CardCarrito from '../components/CardCarrito'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import bolsaVacia from '../img/Shopping-Bag-1.svg'
function CarritoDeCompras () {
  const listaProductos = [
    {
      nombre: 'Torta Brownie',
      descripcion: 'alguna descripcion',
      img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
      precio: '62000',
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
  const [productos, setProductos] = useState(listaProductos)

  const deleteProducts = () => {
    setProductos([])
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-black pl-9 pr-9 sm:text-center">
        Carrito de productos
      </h1>
      <div className="flex bg-[#F6F6F6] border-2 border-solid border-[#E9E9E9] rounded-xl flex-col justify-center items-center m-4 w-11/12">
        {productos.length === 0
          ? (
          <>
            <h1 className="font-semibold text-[#8B7BB1] text-xl p-2">
              ¡Elige algún producto para guardar en tu carrito de compras!
            </h1>
            <div>
              <img
                className="w-full h-auto rounded-l-xl object-cover"
                src={bolsaVacia}
                alt="bolsa vacia"
              />
            </div>
          </>
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
      <button onClick={deleteProducts}> borrar todo</button>
      <Footer />
    </div>
  )
}

export default CarritoDeCompras
