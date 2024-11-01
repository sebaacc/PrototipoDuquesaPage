import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import axios from 'axios'
import endpoints from '../utils/endpoints'

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
  const [showSuccess, setShowSuccess] = useState(false)
  const [confirmarEliminacion, setConfirmarEliminacion] = useState({
    mostrar: false,
    id: null
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      // const response = await axios.get('http://localhost:8090/users', config)
      const response = await axios.get(endpoints.getAndPostUser, config)

      if (response.status === 200) {
        console.log(response.data)
        setUsuarios(response.data)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      // setFieldError('email', '¡Ya existe una cuenta con ese correo!')
    }
  }

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      // const response = await axios.delete(
      //   'http://localhost:8090/users/' + confirmarEliminacion.id,
      //   config
      // )
      const response = await axios.delete(
        endpoints.getAndPostUser + confirmarEliminacion.id,
        config
      )

      console.log(response)
      if (response.status == 204) {
        const newUsers = usuarios.filter((user) => {
          return user.id != confirmarEliminacion.id
        })

        console.log(newUsers)
        setUsuarios(newUsers)
        setShowSuccess(true)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      // setFieldError('email', '¡Ya existe una cuenta con ese correo!')
    }
  }

  const handleEliminar = () => {
    deleteUser(confirmarEliminacion)
    setConfirmarEliminacion({ mostrar: false, id: null })
  }

  const mostrarConfirmacion = (usuario) => {
    console.log(usuario)
    setConfirmarEliminacion({ mostrar: true, id: usuario.id })
  }

  const cancelarConfirmacion = () => {
    setConfirmarEliminacion({ mostrar: false, id: null })
  }

  return (
    <div>
      <Navbar />
      <div className="relative overflow-x-auto m-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gradient-to-l from-[#e077af] to-[#fe99cf]">
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
                Teléfono
              </th>

              <th scope="col" className="px-6 py-3">
                Borrar
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index} className="bg-white border-b text-black">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {usuario.username}
                </th>
                {usuario.email && (
                  <td className="px-6 py-4">{usuario.email}</td>
                )}
                {usuario.document && (
                  <td className="px-6 py-4">{usuario.document}</td>
                )}
                {usuario.phone && (
                  <td className="px-6 py-4">{usuario.phone}</td>
                )}
                <td className="px-6 py-4">
                  <button onClick={() => mostrarConfirmacion(usuario)}>
                    <IoIosCloseCircleOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmarEliminacion.mostrar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            <div className=" flex flex-col mt-3 items-center">
              <button
                className="bg-pink-400 text-white px-4 py-2 rounded w-1/2 mb-2"
                onClick={() => handleEliminar()}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded w-1/2"
                onClick={cancelarConfirmacion}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <p>¡El usuario ha sido eliminado exitósamente!</p>
            <div className=" flex flex-col mt-3 items-center">
              <button
                className="bg-pink-400 text-white px-4 py-2 rounded w-1/2 mb-2"
                onClick={() => setShowSuccess(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReporteDeUsuario
