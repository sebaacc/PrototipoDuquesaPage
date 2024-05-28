import { useState } from 'react'
import CardCarrito from '../components/CardCarrito'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-black pl-9 pr-9 sm:text-center">
        Carrito de productos
      </h1>
      <div className="flex bg-[#F6F6F6] border-2 border-solid border-[#E9E9E9] rounded-xl flex-col justify-center items-end m-4 w-11/12">
        {productos.map((producto, index) => (
          <CardCarrito key={index} producto={producto} setProductos={setProductos} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default CarritoDeCompras
