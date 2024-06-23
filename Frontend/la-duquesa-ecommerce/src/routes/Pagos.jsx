import Navbar from '../components/Navbar'

const PaymentForm = () => {
  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center mb-12 rounded-lg">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 bg-[#BD6292] rounded">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-white">Detalle de Compra</h3>
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
              />
            </div>
            <div className="space-y-2">
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
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="card"
              >
                Productos
              </label>
              <h2 className='font-bold'>Torta de Chocolate x2 unidades</h2><span>Precio:$33,333</span>
              <h2 className='font-bold'>Torta de Limon x1 unidad</h2><span>Precio:$33,333</span>
              <h2 className='font-bold'>Galletas de manteca x12 unidades</h2><span>Precio:$33,333</span>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="cvv"
              >
                Total
              </label>
              <h3>$100,00</h3>
            </div>
          </div>
          <div className="flex items-center p-6">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm border border-gray-900 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentForm
