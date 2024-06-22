import profile from '../img/Profile.png'
import menuHamburger from '../img/MenuHamburguer.png'
import ubication from '../img/icons8-location-64 1.png'
import logo from '../img/LogoRosayAmarillo.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { TbTruckDelivery, TbReport } from 'react-icons/tb'
import {
  MdFavorite,
  MdHelp,
  MdOutlineProductionQuantityLimits
} from 'react-icons/md'
import { IoIosAddCircle } from 'react-icons/io'
import { CiShoppingCart } from 'react-icons/ci'
import { GrPowerShutdown } from 'react-icons/gr'
// import { icon } from '@fortawesome/fontawesome-svg-core'

// import shopCar from '../img/cart-large-minimalistic-svgrepo-com.png'

function Navbar () {
  const [nav, setNav] = useState(false)

  const [navMobile, setNavMobile] = useState(false)
  const [logedOut, setLogedOut] = useState(false)

  const liStyle = 'hover:text-[#CE76A4] mr-6 flex'

  useEffect(() => {
    if (
      localStorage.getItem('accessToken') == null ||
      localStorage.getItem('accessToken') == undefined
    ) {
      setLogedOut(true)
    }
  }, [])

  const menuItems = [
    /*
    {
      icon: <TbTruckDelivery size={25} className="mr-4" />,
      text: 'Ordenes'
    },

    { icon: <MdFavorite size={25} className="mr-4" />, text: 'Favoritos' },
     */
    {
      icon: <IoIosAddCircle size={25} className="mr-4" />,
      text: 'Cargar Producto',
      route: '/registro-producto'
    },
    {
      icon: <TbReport size={25} className="mr-4 P-2" />,
      text: 'Reporte de usuario',
      route: '/reporte-usuario'
    },
    {
      icon: <MdOutlineProductionQuantityLimits size={25} className="mr-4" />,
      text: 'Reporte de producto',
      route: '/reporte-producto'
    },
    /* { icon: <MdHelp size={25} className="mr-4" />, text: 'Ayuda' }, */
    {
      icon: <GrPowerShutdown size={25} className="mr-4" />,
      text: 'Cerrar sesión',
      route: '/'
    }
  ]
  return (
    <section className="flex justify-between p-12 pt-5">
      {/* Menu mobile para las rutas */}
      <div className="sm:block md:block lg:hidden xl:hidden content-center">
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
          <div>
            <ul className="flex flex-col p-4 text-black gap-7 font-medium">
              <Link to={'/'}>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Inicio
                </li>
              </Link>
              <Link to={'/tienda'}>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Productos
                </li>
              </Link>
              <Link to={'/nuestras-sedes'}>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Nuestras sedes
                </li>
              </Link>
              <Link to={'/carrito-de-compras'}>
                <li className="text-xl flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1]">
                  Carrito <CiShoppingCart className="size-6 ml-1" />
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      {/* Rutas o vistas del sitio */}

      {logedOut ? (
        <Link to={'/'} className="flex justify-between">
          <img
            className="size-28 mr-1 relative md:left-0 lg:left-0"
            src={logo}
            alt=""
          />
        </Link>
      ) : (
        <article className="flex justify-between">
          <img
            className="size-7 mr-1 relative left-7 md:left-0 lg:left-0"
            src={ubication}
            alt=""
          />
          <p className="mt-1 flex flex-col md:flex-row text-center">
            {/* <span className="font-bold mr-1">Enviar a</span> KR 21B #29 B - 149 */}
            <span className="font-bold mr-1">
              Configura tu dirección <br /> para recibir pedidos
            </span>
          </p>
        </article>
      )}

      <article className="hidden sm:hidden md:hidden lg:block xl:block 2xl:block mt-1">
        <ul className="flex text-black font-semibold h-full items-center">
          <Link to={'/'}>
            <li className={liStyle}>Inicio</li>
          </Link>
          <Link to={'/tienda'}>
            <li className={liStyle}>Productos</li>
          </Link>
          <Link to={'/nuestras-sedes'}>
            <li className={liStyle}>Nuestras sedes</li>
          </Link>
          <Link to={'/carrito-de-compras'}>
            <li className={liStyle}>
              Carrito <CiShoppingCart className="size-6 ml-1 " />
            </li>
          </Link>
        </ul>
      </article>
      {/* Menu de Administrador */}

      <div className="flex items-center">
        {logedOut
          ? (
          <div className="flex items-center">
            <Link to={'/login'}>
              <button className="bg-[#BD6292] text-white p-2 rounded">
                Ingresar
              </button>
            </Link>
          </div>
            )
          : (
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
            )}

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
                  <div key={index} className="py-4">
                    {route === '/'
                      ? (
                      <Link to={route}>
                        <li
                          onClick={() => {
                            localStorage.clear()
                            window.location.reload()
                          }}
                          className="text-xl flex cursor-pointer w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1] transition duration-300"
                        >
                          {icon} {text}
                        </li>
                      </Link>
                        )
                      : (
                      <Link to={route}>
                        <li className="text-xl flex cursor-pointer w-[100%] rounded-full mx-auto p-2 hover:text-white hover:bg-[#8B7BB1] transition duration-300">
                          {icon} {text}
                        </li>
                      </Link>
                        )}
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
