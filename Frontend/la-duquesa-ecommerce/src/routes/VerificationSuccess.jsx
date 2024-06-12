import React from 'react'
import { Link } from 'react-router-dom'

const VerificationSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-6">
            <div className="max-w-md w-full space-y-4 text-center bg-gray-400 p-4 rounded">
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
                <h2 className="text-2xl font-bold">Cuenta aprobada</h2>
                <p className="text-white dark:text-white">
                    Felicidades! Tu cuenta se ha verificado exitósamente, ahora puedes iniciar sesión.
                </p>
                <Link to={"/login"}>
                    <div
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 mt-5"
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

export default VerificationSuccess
