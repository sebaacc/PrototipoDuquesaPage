import { Link } from 'react-router-dom'

const VerificationUnnecessary = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 md:px-6 bg-[#F7F8FC]">
      <div className="max-w-md w-full space-y-4 text-center bg-white p-4 rounded-lg shadow">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
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
            className="h-6 w-6"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold">
          {'La cuenta ya estaba verificada ;)'}
        </h2>
        <p className="text-[#7F7C82]">
          Tu cuenta ya se había verificado antes exitosamente, ya puedes volver
          a iniciar sesión.
        </p>
        <Link to={'/login'}>
          <div
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#8B7BB1] hover:bg-[#BD6292] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-5"
            href="#"
            rel="ugc"
          >
            Iniciar sesión
          </div>
        </Link>
      </div>
    </div>
  )
}

export default VerificationUnnecessary
