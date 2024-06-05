import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <div className="bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-9xl font-bold text-purple-400">404</h1>
              <h1 className="text-6xl font-medium py-8">
                Oops! Página no encontrada
              </h1>
              <p className="text-2xl pb-8 px-12 font-medium">
                La página que estás buscando no existe. Puede haber sido
                modificada o eliminada.
              </p>
              <p className="text-2xl pb-8 px-12 font-medium">
                Mensaje de Error: {error.statusText || error.message}
              </p>
              <Link to={'/'}>
                <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                  Inicio
                </button>
              </Link>
              <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                Contáctenos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
