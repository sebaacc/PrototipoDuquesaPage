import profile from '../img/Profile.png'
import menuHamburger from '../img/MenuHamburguer.png'
import ubication from '../img/icons8-location-64 1.png'
import { Link } from 'react-router-dom'
// import shopCar from '../img/cart-large-minimalistic-svgrepo-com.png'

function Navbar () {
  return (
    <section className="flex justify-between p-12">
      <article className="sm:block md:block lg:hidden xl:hidden">
        <img src={menuHamburger} alt="" />
      </article>
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

      <article>
        <img className="size-16" src={profile} alt="" />
      </article>
    </section>
  )
}

export default Navbar