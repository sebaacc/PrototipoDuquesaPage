import { useEffect, useState } from 'react'
// import axios from 'axios'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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
  const [filtro, setfiltro] = useState('')

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

  const handleChange = (event) => {
    setfiltro(event.target.value)
  }

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
        <div className="mt-10 flex gap-5 flex-wrap">
          <FormControl
            variant="standard"
            sx={{
              minWidth: 120
            }}
          >
            <InputLabel
              id="demo-simple-select-standard-label"
              className="text-red"
            >
              filtro
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filtro}
              onChange={handleChange}
              label="filtro"
            >
              <MenuItem value={'vendidos'}>Productos más vendidos</MenuItem>
              <MenuItem value={'agregados'}>
                Productos más agregados al carrito
              </MenuItem>
            </Select>
          </FormControl>
          <button className="relative inline-flex items-center justify-center h-10 p-1 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#97a9ff] to-[#e077af] focus:outline-none focus:ring-purple-200 self-end transition duration-150 transform hover:-translate-y-1 active:translate-y-0">
            <span className="font-semibold relative px-5 h-full content-center transition-all ease-in duration-75 group-hover:text-white bg-white rounded-md group-hover:bg-opacity-0">
              Descargar Reporte
            </span>
          </button>
        </div>
        <div className="relative overflow-x-auto mt-10 mb-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-gradient-to-l from-[#e077af] to-[#fe99cf]">
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
