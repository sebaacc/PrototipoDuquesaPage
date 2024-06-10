import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import pastries from '../data/pastries.js'
import ProductsTable from '../components/ProductsTable.jsx'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const productosList = pastries

function ReporteDeProducto () {
  const [productos, setProductos] = useState(productosList)
  const [filtro, setFiltro] = useState('Ninguno')

  const handleChange = (event) => {
    const selectedFilter = event.target.value
    setFiltro(selectedFilter)
    handleFilter(selectedFilter)
  }

  const handleFilter = (val) => {
    const sortedProducts = [...productosList]

    if (val === 'vendidos') {
      sortedProducts.sort((a, b) => parseFloat(b.sold) - parseFloat(a.sold))
    }
    if (val === 'agregados') {
      sortedProducts.sort(
        (a, b) => parseFloat(b.addedToCart) - parseFloat(a.addedToCart)
      )
    }
    setProductos(sortedProducts)
  }

  const handleDownload = (format) => {
    const currentDate = new Date().toLocaleDateString()
    const companyName = 'La Duquesa Bakery'
    const filterUsed = filtro

    if (format === 'xlsx') {
      const ws = XLSX.utils.json_to_sheet([])
      XLSX.utils.sheet_add_aoa(ws, [[companyName]], { origin: 'A1' })
      XLSX.utils.sheet_add_aoa(ws, [[`Fecha de descarga: ${currentDate}`]], {
        origin: 'A2'
      })
      XLSX.utils.sheet_add_aoa(ws, [[`Filtro utilizado: ${filterUsed}`]], {
        origin: 'A3'
      })

      // Añadir encabezados de columna en A5
      XLSX.utils.sheet_add_aoa(ws, [Object.keys(productos[0])], { origin: 'A5' })

      // Añadir los datos de productos a partir de la fila 6
      productos.forEach((producto, index) => {
        XLSX.utils.sheet_add_aoa(ws, [Object.values(producto)], {
          origin: `A${index + 6}`
        })
      })

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Productos')
      XLSX.writeFile(wb, `Reporte_Productos_${currentDate}.xlsx`)
    } else if (format === 'pdf') {
      const doc = new jsPDF()
      doc.text(companyName, 10, 10)
      doc.text(`Fecha de descarga: ${currentDate}`, 10, 20)
      doc.text(`Filtro utilizado: ${filterUsed}`, 10, 30)
      autoTable(doc, {
        startY: 40,
        head: [
          [
            'Nombre',
            'Precio',
            'Stock',
            'Vendidos',
            'Agregados al carrito',
            'Categoría y subcategoría',
            'Código de producto'
          ]
        ],
        body: productos.map((p) => [
          p.title,
          p.price,
          p.stock,
          p.sold,
          p.addedToCart,
          p.type + p.subtipo,
          p.code
        ])
      })
      doc.save('reporte_productos.pdf')
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
          <button
            onClick={() => handleDownload('xlsx')}
            className="relative inline-flex items-center justify-center h-10 p-0.5 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#97a9ff] to-[#e077af] focus:outline-none focus:ring-purple-200 self-end transition duration-150 transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="font-semibold relative px-5 h-full content-center transition-all ease-in duration-75 group-hover:text-white bg-white rounded-md group-hover:bg-opacity-0">
              Descargar Reporte (XLSX)
            </span>
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            className="relative inline-flex items-center justify-center h-10 p-0.5 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#97a9ff] to-[#e077af] focus:outline-none focus:ring-purple-200 self-end transition duration-150 transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="font-semibold relative px-5 h-full content-center transition-all ease-in duration-75 group-hover:text-white bg-white rounded-md group-hover:bg-opacity-0">
              Descargar Reporte (PDF)
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
