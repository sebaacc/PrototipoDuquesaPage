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
        <div className="grid max-sm:justify-center">
          <h1 className="text-3xl font-bold">Reporte de Productos</h1>
        </div>
        <div className="relative overflow-x-auto mt-10 mb-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {producto.nombre}
                  </th>
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
        <div className="grid max-sm:justify-center">
          <h3 className="text-xl font-normal">Generar reporte de ventas</h3>
        </div>
        <div className="mt-4 flex justify-around sm:justify-start sm:gap-8">
          <select
            id="small"
            className="block w-1/2 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
          >
            <option value="Historico">Histórico</option>
            <option value="Actual">Mes actual</option>
            <option value="Anterior">Último mes</option>
            <option value="SeisMeses">Últimos 6 meses</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 h-10">
            Generar Informe
          </button>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default ReporteDeProducto
