import Navbar from '../components/Navbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import endpoints from '../utils/endpoints'
import { data } from 'autoprefixer'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


const PaymentForm = () => {
  const [productos, setProductos] = useState([])
  const [productosToPay, setProductosToPay] = useState([])
  const [user, setUser] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const token = localStorage.getItem('accessToken')
  const userId = JSON.parse(localStorage.getItem('user')).sub
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    fetchData()
    getUser()
    initMercadoPago("APP_USR-77d602c0-2bb3-4d97-aa9f-36b7b8882c90");
  }, [])

  useEffect(() => {
    handleSubmitPayment()
  }, [productos])



  const fetchData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const response = await axios.get(
        `${endpoints.getFromCart}/${userId}`,
        config
      )
      console.log(response.data)

      if (response.status === 200) {

        let precioTotalASumar = 0

        response.data.forEach((producto) => {
          precioTotalASumar += (producto.price * producto.amount)
        })
        setTotalPrice(precioTotalASumar)

        setProductos(response.data)
      }
    } catch (error) {
      console.error('Error getting productos:', error)
    }
  }

  const getUser = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).sub
    const token = localStorage.getItem('accessToken')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const response = await axios.get(`${endpoints.getUser}/${userId}`, config)
      console.log(response.data)

      if (response.status === 200) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Error getting user:', error)
    }
  }

  function addressChange(value) {
    setUser({ ...user, location_details: value })
  }


  const handleSubmitPayment = async () => {

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const productsToPayArray = []
    productos.forEach((producto) => {
      productsToPayArray.push({
        idproduct: producto.id,
        numberofunits: producto.amount,
        price: producto.price
      })
    })

    const data = {
      iduser: userId,
      paymentMethod: "Mercado pago",
      address: user.location_details,
      allOrders: productsToPayArray
    }
    try {
      const response = await axios.post(
        `${endpoints.createPayment}`,
        data,
        config
      )

      if (response.status === 200) {
        console.log(response.data)
        setPreferenceId(response.data.id)
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const data = {
      location_details: user.location_details
    }
    try {
      const response = await axios.patch(
        `${endpoints.getUser}/${userId}`,
        data,
        config
      )

      if (response.status === 200) {
        // setSuccessMessage('Tus campos han sido guardados correctamente.')
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mb-12 rounded-lg">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-6 bg-[#BD6292] rounded">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-white">
              Detalle de Compra
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Dirección
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                placeholder="Nueva Córdoba, Cba, etc..."
                value={user && user.location_details}
                onChange={(e) => addressChange(e.target.value)}
              />
            </div>
            {/* <div className="space-y-2">
              <label
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Detalles de Dirección
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="Piso 4, Depto B, etc..."
                type="email"
              />
            </div> */}
            <div className="space-y-2">
              <label
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="card"
              >
                Productos
              </label>
              {productos &&
                productos.map((producto) => (
                  <>
                    <h2 className="font-bold">
                      {producto.name} x{producto.amount}
                    </h2>
                    <span>
                      Precio:{' '}
                      {(producto.amount * producto.price).toLocaleString()}$
                    </span>
                  </>
                ))}
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="cvv"
              >
                Total
              </label>
              <h3>{totalPrice && totalPrice.toLocaleString()}</h3>
            </div>
          </div>
          <div className="flex items-center p-6">
            {/*
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm border border-gray-900 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Pay Now
            </button>
            */}
            {preferenceId && (
              <Wallet initialization={{ preferenceId }} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentForm
