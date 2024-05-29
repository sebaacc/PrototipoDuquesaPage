import profile from '../img/Profile.png'
import menuHamburger from '../img/MenuHamburguer.png'
import ubication from '../img/icons8-location-64 1.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { MdFavorite, MdHelp } from 'react-icons/md'
import { IoIosAddCircle } from 'react-icons/io'

// import shopCar from '../img/cart-large-minimalistic-svgrepo-com.png'

function Navbar () {
  const [nav, setNav] = useState(false)

  const [navMobile, setNavMobile] = useState(false)

  const menuItems = [
    {
      icon: <TbTruckDelivery size={25} className="mr-4" />,
      text: 'Ordenes'
    },
    { icon: <MdFavorite size={25} className="mr-4" />, text: 'Favoritos' },
    {
      icon: <IoIosAddCircle size={25} className="mr-4" />,
      text: 'Cargar Producto',
      route: '/registro-producto'
    },
    { icon: <MdHelp size={25} className="mr-4" />, text: 'Ayuda' }
  ]
  return (
    <section className="flex justify-between p-12">
      {/* Menu mobile para las rutas */}
      <div className="sm:block md:block lg:hidden xl:hidden">
        <div className="flex items-center">
          <article
            onClick={() => setNavMobile(!navMobile)}
            className=" cursor-pointer"
          >
            <img src={menuHamburger} alt="Menu de secciones" />
          </article>
        </div>

        {navMobile
          ? (
          <div
            className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
            onClick={() => setNavMobile(!navMobile)}
          ></div>
            )
          : (
              ''
            )}

        <div
          className={
            navMobile
              ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300'
              : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
          }
        >
          <AiOutlineClose
            onClick={() => setNavMobile(!navMobile)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer text-[#9D9D9D]"
          />
          <h2 className="text-2xl p-4">
            <span className="font-bold text-[#BD6292]">Secciones</span>
          </h2>
          <navMobile>
            <ul className="flex flex-col p-4 text-black gap-7 font-medium">
              <Link to={'/'}>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Inicio
                </li>
              </Link>
              <Link>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Productos
                </li>
              </Link>
              <Link>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Nuestras sedes
                </li>
              </Link>
              <Link to={'/carrito-de-compras'}>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Carrito
                </li>
              </Link>
            </ul>
          </navMobile>
        </div>
      </div>
      {/* Rutas o vistas del sitio */}
      <article className="flex justify-between">
        <img
          className="size-7 mr-1 relative left-7 md:left-0 lg:left-0"
          src={ubication}
          alt=""
        />
        <p className="mt-1 flex flex-col md:flex-row text-center">
          <span className="font-bold mr-1">Enviado a</span> KR 21B #29 B - 149
        </p>
      </article>

      <article className="hidden sm:hidden md:hidden lg:block xl:block 2xl:block mt-1">
        <ul className="flex text-black font-semibold">
          <Link to={'/'}>
            <li className="mr-16">Inicio</li>
          </Link>
          <Link to={'/'}>
            <li className="mr-16">Productos</li>
          </Link>
          <Link to={'/'}>
            <li className="mr-16">Nuestras sedes</li>
          </Link>
          <Link to={'carrito-de-compras'}>
            <li className="mr-16 flex">Carrito</li>
          </Link>
        </ul>
      </article>
      {/* Menu de Administrador */}
      <div>
        <div className="flex items-center">
          <article>
            <img
              onClick={() => setNav(!nav)}
              className="size-16 cursor-pointer"
              src={profile}
              alt="Perfil"
            />
          </article>
        </div>

        {nav
          ? (
          <div
            className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
            onClick={() => setNav(!nav)}
          ></div>
            )
          : (
              ''
            )}

        <div
          className={
            nav
              ? 'fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300'
              : 'fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer text-[#9D9D9D]"
          />
          <h2 className="text-2xl p-4">
            La <span className="font-bold text-[#BD6292]">Duquesa</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-black gap-7 font-medium">
              {menuItems.map(({ icon, text, route }, index) => {
                return (
                  <div key={index} className=" py-4">
                    <Link to={route}>
                      <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                        {icon} {text}
                      </li>
                    </Link>
                  </div>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Navbar
