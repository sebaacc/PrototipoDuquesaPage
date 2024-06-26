import { Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Link } from 'react-router-dom'
import Loading from '../utils/Loading'
import PropTypes from 'prop-types'

const MobileHomeCategories = ({ categories }) => {
  return (
    <>
      {categories
        ? (
        <Swiper
          modules={[Scrollbar, A11y]}
          spaceBetween={80}
          slidesPerView={3.6}
          scrollbar={{ draggable: true }}
        >
          {categories.slice(0, 6).map((category, index) => (
            <SwiperSlide key={index}>
              <Link to={`/tienda?search=${category.name}`}>
                <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition duration-300 transform hover:-translate-y-2 active:translate-y-0 w-max">
                  <img
                    className="group-hover:bg-white rounded-full w-[80px] h-[80px] transition duration-300"
                    src={category.categoryImage}
                    alt={category.name}
                  />
                  <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-white transition duration-300">
                    {category.name}
                  </p>
                </article>
              </Link>{' '}
            </SwiperSlide>
          ))}
        </Swiper>
          )
        : (
        <Loading />
          )}
    </>
  )
}

MobileHomeCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryImage: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
}

export default MobileHomeCategories
