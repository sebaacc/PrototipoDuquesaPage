import { Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Link } from 'react-router-dom'
import categories from '../data/homeCategories'

const MobileHomeCategories = () => {
  return (
    <>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
      >
        {categories.map((categoria, index) => (
          <SwiperSlide key={index}>
            <Link to={`/tienda?search=${categoria.nombre}`}>
              <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition duration-300 transform hover:-translate-y-2 active:translate-y-0">
                <img
                  className="group-hover:bg-white rounded-full w-[80px] h-[80px] transition duration-300"
                  src={categoria.src}
                  alt={categoria.nombre}
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-white transition duration-300">
                  {categoria.nombre}
                </p>
              </article>
            </Link>{' '}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default MobileHomeCategories
