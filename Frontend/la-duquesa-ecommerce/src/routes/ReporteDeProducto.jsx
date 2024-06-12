import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import pastries from '../data/pastries.js'
import ProductsTable from '../components/ProductsTable.jsx'
import ExcelButton from '../components/ExcelButton.jsx'
import PDFButton from '../components/PDFButton.jsx'
import axios from 'axios'

const productosList = pastries

function ReporteDeProducto() {
  const [productos, setProductos] = useState(productosList)
  const [filtro, setFiltro] = useState('Ninguno')
  

  useEffect(() => {
    setFiltro("agregados")
    handleFilter("agregados")
    fetchData()
  }, [])



  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get('http://localhost:8090/cart/cartInfo/findMostAddedProducts/15', config);

      if (response.status === 200) {
        console.log(response.data)
        setProductos(response.data)
      }
    } catch (error) {
      console.error('Error updating user:', error);
      //setFieldError('email', '¡Ya existe una cuenta con ese correo!');
    }
  };


  const handleChange = (event) => {
    const selectedFilter = event.target.value
    setFiltro(selectedFilter)
    if (selectedFilter == "agregados") {
      fetchData()
    }
    else {
      handleFilter(selectedFilter)
    }

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
          <ExcelButton productos={productos} />
          <PDFButton productos={productos} />
        </div>
        <div className="relative overflow-x-auto mt-10 mb-10">
          <ProductsTable productos={productos} typeOfSearch={filtro} />
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default ReporteDeProducto
