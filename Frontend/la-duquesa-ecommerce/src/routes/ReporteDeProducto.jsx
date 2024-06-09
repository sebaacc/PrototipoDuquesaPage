import { useEffect, useState } from 'react'
// import axios from 'axios'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import pastries from '../data/pastries.js'

import ProductsTable from '../components/ProductsTable.jsx'

const productosList = pastries

function ReporteDeProducto () {
  const [productos, setProductos] = useState(productosList)
  const [filtro, setfiltro] = useState('')

  const handleChange = (event) => {
    setfiltro(event.target.value)
    handleFilter()
  }

  const handleFilter = () => {
    if (filtro === 'vendidos') {
      setProductos(
        productos.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      )
    } else if (filtro === 'agregados') {
      setProductos(
        productos.sort((a, b) => parseFloat(b.sold) - parseFloat(a.sold))
      )
    }
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
          <button className="relative inline-flex items-center justify-center h-10 p-0.5 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#97a9ff] to-[#e077af] focus:outline-none focus:ring-purple-200 self-end transition duration-150 transform hover:-translate-y-1 active:translate-y-0">
            <span className="font-semibold relative px-5 h-full content-center transition-all ease-in duration-75 group-hover:text-white bg-white rounded-md group-hover:bg-opacity-0">
              Descargar Reporte
            </span>
          </button>
        </div>
        <div className="relative overflow-x-auto mt-10 mb-10">
          <ProductsTable productos={productos} />
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default ReporteDeProducto
