import { useState } from 'react'
import PropTypes from 'prop-types'
import { MdImageNotSupported } from 'react-icons/md'
import { Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const ImageGallery = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)

  // Solo llenar el array de imágenes con placeholders si hay menos de 4 imágenes
  const filledImages =
    images.length < 4
      ? [...images, ...Array(4 - images.length).fill(null)]
      : images

  return (
    <>
      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
        {filledImages[imageIndex]
          ? (
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center p-3">
            <img
              src={filledImages[imageIndex]}
              alt={`Imagen ${imageIndex + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
            )
          : (
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
            <span className="text-5xl flex flex-col items-center p-8 text-gray-500">
              No se encuentra la imagen <MdImageNotSupported />
            </span>
          </div>
            )}
      </div>

      <Swiper
        modules={[Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={4}
        pagination={{ clickable: true, style: { color: 'white' } }}
        scrollbar={{ draggable: false }}
        className=" max-sm:h-[8rem] md:h-[10rem] font-black"
        style={{
          '--swiper-pagination-color': '#BD6292',
          '--swiper-pagination-bullet-size': '10px'
        }}
      >
        {filledImages.map((image, i) => (
          <div key={i}>
            <SwiperSlide className=" mb-8">
              <button
                onClick={() => setImageIndex(i)}
                className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                  imageIndex === i ? 'ring-2 ring-indigo-300 ring-inset' : ''
                }`}
                disabled={!image}
              >
                {image
                  ? (
                  <img
                    src={image}
                    alt={`Miniatura ${i + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                    )
                  : (
                  <MdImageNotSupported className="text-2xl text-gray-400" />
                    )}
              </button>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ImageGallery
