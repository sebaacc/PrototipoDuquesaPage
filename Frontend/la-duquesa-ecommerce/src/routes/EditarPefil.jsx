import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'
import endpoints from '../utils/endpoints'

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState('/placeholder-user.jpg')
  const [password, setPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [user, setUser] = useState({})

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
    setShowConfirmPassword(value.length > 0)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).sid

    const token = localStorage.getItem('accessToken')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    try {
      const response = await axios.get(`${endpoints.getUser}/${userId}`, config)

      if (response.status === 200) {
        setUser(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error getting user:', error)
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
          <form className="mt-8 space-y-6">
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
                  value={user.name || ''}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center content-center"
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {showConfirmPassword && (
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="confirm-password"
                >
                  Confirmar Contraseña
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center content-center"
                  id="confirm-password"
                  placeholder="********"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            )}
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
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-[#BD6292] rounded p-2 text-white">
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
