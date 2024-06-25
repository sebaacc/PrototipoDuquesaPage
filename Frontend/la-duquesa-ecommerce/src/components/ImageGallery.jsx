import { useEffect, useState } from 'react'
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
  // const filledImages =
  //   images.length < 4
  //     ? [...images, ...Array(4 - images.length).fill(null)]
  //     : images

  useEffect(() => {
    console.log('hola')
    console.log(images)
  }, [])

  return (
    <>
      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 shadow-md">
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center p-3">
            <img
              src={images[imageIndex]}
              // src="https://duquesabucket.s3.us-east-2.amazonaws.com/product_8134339177120133066.png"
              alt={`Imagen ${imageIndex + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
      </div>

      <Swiper
        modules={[Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={4}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="custom-swiper p-2 shadow-lg rounded-md "
        style={{
          '--swiper-pagination-color': '#BD6292',
          '--swiper-pagination-bullet-size': '10px'
        }}
      >
        {images.map((image, i) => (
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
