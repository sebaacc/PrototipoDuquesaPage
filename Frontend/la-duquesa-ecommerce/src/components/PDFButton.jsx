import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import PropTypes from 'prop-types'

const PDFButton = ({ productos }) => {
  const currentDate = new Date().toLocaleDateString()
  const companyName = 'La Duquesa Bakery'

  const handleDownload = async () => {
    const data = productos
    const doc = new JsPDF()
    doc.text(companyName, 10, 10)
    doc.text(`Fecha de descarga: ${currentDate}`, 10, 20)
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
      body: data.map((p) => [
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
  return (
    <button
      onClick={handleDownload}
      className="relative inline-flex items-center justify-center h-10 p-0.5 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-bl from-[#97a9ff] to-[#e077af] focus:outline-none focus:ring-purple-200 self-end transition duration-150 transform hover:-translate-y-1 active:translate-y-0"
    >
      <span className="font-semibold relative px-5 h-full content-center transition-all ease-in duration-75 group-hover:text-white bg-white rounded-md group-hover:bg-opacity-0">
        Descargar Reporte (PDF)
      </span>
    </button>
  )
}

export default PDFButton

PDFButton.propTypes = {
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
