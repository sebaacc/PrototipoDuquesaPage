import { useEffect, useState } from 'react'
// import axios from 'axios'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'

const productosIniciales = [
  {
    nombre: 'Torta de chocolate',
    precio: '$14.000',
    stock: 10,
    vendido: 5
  },
  {
    nombre: 'Croissant',
    precio: '$3.800',
    stock: 3,
    vendido: 8
  },
  {
    nombre: 'Cupcake de Naranja con crocante',
    precio: '$5.000',
    stock: 0,
    vendido: 20
  }
]

function ReporteDeProducto () {
  const [productos, setProductos] = useState(productosIniciales)

  // useEffect(() => {
  //   axios
  //     .get('TU_API_URL_AQUI')
  //     .then((response) => {
  //       setProductos(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Hubo un error al obtener los datos:', error)
  //     })
  // }, [])

  return (
    <section className="min-h-screen">
      <Navbar />
      <div className="px-4 container max-w-6xl mx-auto py-4">
        <div className="grid max-sm:justify-center gap-4">
          <h1 className="text-3xl font-bold">Reporte de Producto</h1>
          <h4>
            Aquí puedes encontrar reportes sobre las ventas en los últimos
            tiempos y la popularidad de tus productos.
          </h4>
        </div>
        <div className="mt-10 flex gap-3 flex-wrap">
          <h4 className="text-lg font-medium">Seleccione un filtro</h4>
          <select
            id="small"
            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 h-10 min-w-[200px] "
          >
            <option value="vendidos">Productos más vendidos</option>
            <option value="añadidos">Productos más agregados al carrito</option>
          </select>
          <button className="px-4 py-2 bg-[#BD6292] text-white font-semibold rounded hover:bg-[#CE76A4] h-10  min-w-[200px] ">
            Descargar Reporte
          </button>
        </div>
        <div className="relative overflow-x-auto mt-10 mb-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#9a5078] to-[#e285c3] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre de Producto
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad en Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad Vendida
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {producto.nombre}
                  </td>
                  <td className="px-6 py-4">{producto.precio}</td>
                  <td
                    className={`px-6 py-4 ${
                      producto.stock === 0 ? 'text-red-500' : ''
                    }`}
                  >
                    {producto.stock}
                  </td>
                  <td className="px-6 py-4">{producto.vendido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default ReporteDeProducto
