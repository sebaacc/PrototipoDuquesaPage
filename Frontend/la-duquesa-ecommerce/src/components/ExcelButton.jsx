import writeXlsxFile from 'write-excel-file'
import PropTypes from 'prop-types'

const ExcelButton = ({ productos }) => {
  const handleDownload = async () => {
    const schema = [
      {
        column: 'ID',
        type: Number,
        value: (row) => row.id
      },
      {
        column: 'Título',
        type: String,
        value: (row) => row.title
      },
      {
        column: 'Descripción',
        type: String,
        value: (row) => row.description
      },
      {
        column: 'Tipo',
        type: String,
        value: (row) => row.type
      },
      {
        column: 'Subtipo',
        type: String,
        value: (row) => row.subtipo
      },
      {
        column: 'Precio (COP)',
        type: Number,
        value: (row) => row.price
      },
      {
        column: 'Stock',
        type: Number,
        value: (row) => row.stock
      },
      {
        column: 'Vendido',
        type: Number,
        value: (row) => row.sold
      },
      {
        column: 'Código',
        type: String,
        value: (row) => row.code
      },
      {
        column: 'Añadido al Carrito',
        type: Number,
        value: (row) => row.addedToCart
      }
    ]

    const data = productos

    await writeXlsxFile(data, {
      schema,
      fileName: 'productos.xlsx'
    })
  }

  return (
    <button
      onClick={handleDownload}
      className="relative inline-flex items-center justify-center h-10 p-0.5 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#97a9ff] to-[#e077af] focus:outline-none focus:ring-purple-200 self-end transition duration-150 transform hover:-translate-y-1 active:translate-y-0"
    >
      <span className="font-semibold relative px-5 h-full content-center transition-all ease-in duration-75 group-hover:text-white bg-white rounded-md group-hover:bg-opacity-0">
        Descargar Reporte (XLSX)
      </span>
    </button>
  )
}

export default ExcelButton

ExcelButton.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      subtipo: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      sold: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      addedToCart: PropTypes.number.isRequired
    })
  ).isRequired
}