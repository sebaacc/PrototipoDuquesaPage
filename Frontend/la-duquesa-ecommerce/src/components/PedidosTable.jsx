import { priceFormatter } from '../utils/PriceFormatter'
import PropTypes from 'prop-types'

const PedidosTable = ({ pedidos }) => {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-gradient-to-l from-[#e077af] to-[#fe99cf]">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/5">
              id de transacción
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              total Pagado
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              dirección
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              fecha
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              lista de productos
            </th>
          </tr>
        </thead>
        <tbody>
          {pedidos && pedidos.map(
            (pedido, index) =>
              index <= 15 && (
                <tr key={index} className="bg-white border-b border-[#464646]">
                  <td scope="row" className="px-6 py-4 font-medium">
                    {pedido.idTransaction}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {'$' + priceFormatter(pedido.totalPaid)}
                  </td>
                  <td className="px-6 py-4">{pedido.address}</td>
                  <td className="px-6 py-4">
                    <span className=" font-semibold">{pedido.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    {pedido.allOrders.map((orden, index) => (
                      <div
                        key={index}
                        className="flex flex-col border-2 mt-2 rounded-sm p-1"
                      >
                        <td>
                          Producto:{' '}
                          <span className=" font-bold">{orden.idproduct}</span>
                        </td>
                        <td>
                          Unidades:{' '}
                          <span className=" font-bold">
                            {orden.numberofunits}
                          </span>
                        </td>
                        <td>
                          Precio:{' '}
                          <span className=" font-bold">
                            {'$' + priceFormatter(orden.price)}
                          </span>
                        </td>
                      </div>
                    ))}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  )
}

const orderShape = PropTypes.shape({
  idproduct: PropTypes.string.isRequired,
  numberofunits: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
})

const transactionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  iduser: PropTypes.number.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalPaid: PropTypes.number.isRequired,
  paymentStatus: PropTypes.string.isRequired,
  idTransaction: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  allOrders: PropTypes.arrayOf(orderShape).isRequired
})

const transactionsPropTypes = PropTypes.arrayOf(transactionShape).isRequired

PedidosTable.propTypes = {
  pedidos: transactionsPropTypes
}

export default PedidosTable
