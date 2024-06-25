import { useEffect, useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'
import endpoints from '../utils/endpoints'

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState('/placeholder-user.jpg')
  const [user, setUser] = useState({})
  const [isEditable, setIsEditable] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleProfilePictureChange = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData()
  }, [])

  const handleChange = useCallback((field, value) => {
    setUser(prevUser => ({ ...prevUser, [field]: value }))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userId = JSON.parse(localStorage.getItem('user')).sub
    const token = localStorage.getItem('accessToken')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const response = await axios.patch(`${endpoints.getUser}/${userId}`, user, config)

      if (response.status === 200) {
        setIsEditable(false)
        setUser(response.data)
        setSuccessMessage('Tus campos han sido guardados correctamente.')
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <section className="w-full max-w-3xl mx-auto">
        <div className="px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Edita tu perfil
            </h2>
            <p className="text-gray-500">
              Edita tu información personal y foto de perfil.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {successMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={user.first_name || ''}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastname"
                >
                  Apellido
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="lastname"
                  placeholder="Doe"
                  value={user.last_name || ''}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="username"
                >
                  Nombre de usuario
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="username"
                  placeholder="johndoe"
                  type="text"
                  value={user.username || ''}
                  onChange={(e) => handleChange('username', e.target.value)}
                  disabled={true}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  value={user.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="phone"
                >
                  Teléfono
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="phone"
                  placeholder="300 00000"
                  type="text"
                  value={user.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="document"
                >
                  Documento
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="document"
                  placeholder="100000000"
                  type="text"
                  value={user.document || ''}
                  onChange={(e) => handleChange('document', e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="document"
                >
                  Dirección
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="document"
                  placeholder="Ejemplo: Cra 34 #43C - 31"
                  type="text"
                  value={user.location_details || ''}
                  onChange={(e) => handleChange('location_details', e.target.value)}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="profile-picture"
              >
                Foto de perfil
              </label>
              <div className="flex items-center gap-4">
                <span className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16">
                  {profilePicture === '/placeholder-user.jpg'
                    ? (
                    <FaUserCircle className="w-full h-full text-gray-500" />
                      )
                    : (
                    <img
                      className="aspect-square h-full w-full"
                      alt="Profile Picture"
                      src={profilePicture}
                    />
                      )}
                </span>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="profile-picture"
                  type="file"
                  onChange={handleProfilePictureChange}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-500 rounded p-2 text-white"
                onClick={() => setIsEditable(true)}
              >
                Editar
              </button>
              <button
                type="submit"
                className="bg-[#BD6292] rounded p-2 text-white"
                disabled={!isEditable}
              >
                Guardar
              </button>
            </div>
          </form>

        </div>
      </section>
    </div>
  )
}

export default EditProfile
