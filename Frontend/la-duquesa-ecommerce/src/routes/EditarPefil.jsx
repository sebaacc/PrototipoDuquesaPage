import { useState } from 'react'
import Navbar from '../components/Navbar'
import { FaUserCircle } from 'react-icons/fa'

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState('/placeholder-user.jpg')
  const [password, setPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

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
                    <FaUserCircle className="w-full h-full text-[#b53b9c]" />
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
