import Navbar from '../components/Navbar'

const PurchaseConfirmedCard = () => {
  return (
    <>
    <Navbar/>
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto p-8 text-center"
      data-v0-t="card"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500 w-12 h-12"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Tu compra ha sido confirmada</h2>
          <p className="text-muted-foreground">Orden #12345 | Total: $99.99</p>
          <p className="text-muted-foreground">Dirección: <span>Medallo</span></p>
        </div>
        <a href="#"></a>
      </div>
    </div>
    </>
  )
}

export default PurchaseConfirmedCard
