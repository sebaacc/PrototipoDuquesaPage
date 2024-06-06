import { useEffect, useState } from 'react'
// import axios from 'axios'
import Navbar from '../components/Navbar'

const usuariosIniciales = [
  {
    nombre: 'Julian Pérez',
    email: 'julian@gmail.com',
    documento: '11.111.111',
    pedidos: 15,
    consumo_total: '$547.100'
  },
  {
    nombre: 'Raul Rodriguez',
    email: 'raul@gmail.com',
    documento: '11.111.111',
    pedidos: 4,
    consumo_total: '$103.350'
  },
  {
    nombre: 'Marina Correa',
    email: 'marina@gmail.com',
    documento: '11.111.111',
    pedidos: 6,
    consumo_total: '$134.900'
  }
]

function ReporteDeUsuario () {
  const [usuarios, setUsuarios] = useState(usuariosIniciales)

  // useEffect(() => {
  //   axios
  //     .get('TU_API_URL_AQUI')
  //     .then((response) => {
  //       setUsuarios(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Hubo un error al obtener los datos:', error)
  //     })
  // }, [])

  return (
    <div>
      <Navbar />
      <div className="relative overflow-x-auto m-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre de usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Documento
              </th>
              <th scope="col" className="px-6 py-3">
                Pedidos
              </th>
              <th scope="col" className="px-6 py-3">
                Consumo total
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {usuario.nombre}
                </th>
                <td className="px-6 py-4">{usuario.email}</td>
                <td className="px-6 py-4">{usuario.documento}</td>
                <td className="px-6 py-4">{usuario.pedidos}</td>
                <td className="px-6 py-4">{usuario.consumo_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReporteDeUsuario
