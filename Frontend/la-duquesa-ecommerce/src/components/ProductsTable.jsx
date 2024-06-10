import { priceFormatter } from '../utils/PriceFormatter'
import PropTypes from 'prop-types'

const ProductsTable = ({ productos }) => {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-gradient-to-l from-[#e077af] to-[#fe99cf]">
          <tr>
            <th scope="col" className="px-6 py-3 w-min"></th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Nombre de Producto
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              precio
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              En Stock
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Vendidos
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              añadido al carrito
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Categoría y subcategoría
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Código de producto
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td scope="row" className="px-6 py-4 font-medium">
                {index + 1 + '.'}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {producto.title}
              </td>
              <td className="px-6 py-4">
                {'$' + priceFormatter(producto.price)}
              </td>
              <td
                className={`px-6 py-4 ${
                  producto.stock <= 20 ? 'text-red-500 font-bold bg-[#bd629326]' : ''
                }`}
              >
                {producto.stock}
              </td>
              <td className="px-6 py-4">{producto.sold}</td>
              <td className="px-6 py-4">{producto.addedToCart}</td>
              <td className="px-6 py-4">
                {producto.type + ', '}
                <span className=" font-semibold">{producto.subtipo}</span>
              </td>
              <td className="px-6 py-4">{producto.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

ProductsTable.propTypes = {
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

export default ProductsTable
