import { priceFormatter } from '../utils/PriceFormatter'
import PropTypes from 'prop-types'

const PedidosTable = ({ productos, typeOfSearch }) => {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-gradient-to-l from-[#e077af] to-[#fe99cf]">
          <tr>
            <th scope="col" className="px-6 py-3 w-min"></th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Imagen de Producto
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Nombre de Producto
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              precio
            </th>

            {typeOfSearch === 'vendidos' && (
              <th scope="col" className="px-6 py-3 w-1/5">
                Vendidos
              </th>
            )}
            {typeOfSearch === 'agregados' && (
              <th scope="col" className="px-6 py-3 w-1/5">
                añadido al carrito
              </th>
            )}

            <th scope="col" className="px-6 py-3 w-1/5">
              Sub-Categoría
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Código de producto
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map(
            (producto, index) =>
              index <= 5 && (
                <tr key={index} className="bg-white border-b border-[#464646]">
                  <td scope="row" className="px-6 py-4 font-medium">
                    {index + 1 + '.'}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      src={producto.imageURL}
                      alt="Imagen no encontrada"
                      className="h-24 w-24 object-cover"
                    />
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {producto.name}
                  </td>
                  <td className="px-6 py-4">
                    {'$' + priceFormatter(producto.price)}
                  </td>

                  {typeOfSearch === 'vendidos' && (
                    <td className="px-6 py-4">{producto.sold}</td>
                  )}
                  {typeOfSearch === 'agregados' && (
                    <td className="px-6 py-4">{producto.totalQuantity}</td>
                  )}
                  <td className="px-6 py-4">
                    <span className=" font-semibold">
                      {producto.subCategoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4">{producto.id}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  )
}

PedidosTable.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      subtipo: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      sold: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      addedToCart: PropTypes.number.isRequired
    })
  ).isRequired,
  typeOfSearch: PropTypes.string.isRequired
}

export default PedidosTable
