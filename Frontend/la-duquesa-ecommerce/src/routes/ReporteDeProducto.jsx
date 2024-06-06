import { useEffect, useState } from 'react'
// import axios from 'axios'
import Navbar from '../components/Navbar'

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
    <div>
      <Navbar />
      <div className="relative overflow-x-auto m-8">
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
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Generar Informe
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReporteDeProducto
