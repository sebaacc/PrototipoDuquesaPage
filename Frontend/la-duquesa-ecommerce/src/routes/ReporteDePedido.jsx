import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import endpoints from '../utils/endpoints.js'
import PedidosTable from '../components/PedidosTable.jsx'

const pedidosList = [
  {
    id: '667c57a6cae27ea37b55b64b',
    iduser: 20,
    paymentMethod: 'Mercado Pago',
    date: '2024-06-26T18:02:14.64Z',
    totalPaid: 261000,
    paymentStatus: 'Success',
    idTransaction: '1868085675-c34d23e2-66f3-442a-918a-f08fe2a093b8',
    address: 'La rioja 1225',
    allOrders: [
      {
        idproduct: '2',
        numberofunits: 7,
        price: 15000
      },
      {
        idproduct: '3',
        numberofunits: 13,
        price: 12000
      }
    ]
  }
]

function ReporteDePedido () {
  const [pedidos, setPedido] = useState(pedidosList)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      const response = await axios.get(
        endpoints.getMostAddedProducts + '/15',
        config
      )

      if (response.status === 200) {
        console.log(response.data)
        setPedido(response.data)
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <section className="min-h-screen">
      <Navbar />
      <div className="px-4 container max-w-6xl mx-auto py-4">
        <div className="grid max-sm:justify-center gap-4">
          <h1 className="text-3xl font-bold">Reporte de Pedidos</h1>
          <h4>Aquí puedes encontrar reportes sobre los pedidos.</h4>
        </div>
        <div className="relative overflow-x-auto mt-10 mb-10">
          <PedidosTable pedidos={pedidos} />
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default ReporteDePedido
