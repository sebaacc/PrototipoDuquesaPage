import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaRegCopyright
} from 'react-icons/fa'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import { GiInjustice } from 'react-icons/gi'
import logo from '../img/logoConBorde.png'

function Footer () {
  return (
    <footer className="bg-[#BD6292] p-10 flex flex-col items-center">
      <img className="w-40 h-42 m-auto" src={logo} alt="" />
      <article className="m-auto">
        <p className="text-white font-semibold h-20 size-80 text-xl m-auto lg:">
          Tu antojo, nuestra especialidad.
        </p>
        <p className="text-white md:mb-6">
          El arte de la repostería en cada detalle
        </p>
      </article>
      <article className="md:m-auto flex mt-8">
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="size-6 mr-4 text-white" />
        </a>
        <FaFacebook className="size-6 mr-4 text-white" />
        <FaInstagram className="size-6 mr-4 text-white" />
        <FaTiktok className="size-6 text-white" />
      </article>
      <section className="lg:flex lg:m-auto">
        <article className="mt-8 ml-10">
          <p className="flex font-bold text-white mb-4">
            <MdEmail className="text-white size-6 mr-3" /> Email
          </p>
          <p className="text-white">laduquesabakery@gmail.com</p>
        </article>
        <article className="mt-8 ml-10">
          <p className="flex font-bold text-white mb-4">
            <MdLocationPin className="text-white size-6 mr-3" /> Oficina
          </p>
          <p className="text-white">Central motora Cra 30 Local 209</p>
        </article>
        <article className="mt-8 ml-10">
          <p className="flex font-bold text-white mb-4">
            <GiInjustice className="text-white size-6 mr-3" /> Legal
          </p>
          <p className="text-white mb-3">Política de tratamiento de datos</p>
          <p className="text-white">Términos y condiciones</p>
        </article>
        <article className="mt-8 ml-10">
          <p className="flex text-white size-64 h-12">
            <FaRegCopyright className="size-7 mr-2" /> 2024 - Promotora Duquesa
            - Todos los derechos reservados
          </p>
        </article>
      </section>
    </footer>
  )
}

export default Footer
