import { useState } from 'react'
import PropTypes from 'prop-types'
import { MdImageNotSupported } from 'react-icons/md'

const ImageGallery = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <>
      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
        {images[imageIndex]
          ? (
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center p-3">
            <img
              src={images[imageIndex]}
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

      <div className="flex -mx-2 mb-4 overflow-x-auto space-x-2 me-auto ">
        {images.map(
          (image, i) =>
            image && (
              <div key={i} className="flex-1 px-2 min-w-max max-w-[30%]">
                <button
                  onClick={() => setImageIndex(i)}
                  className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                    imageIndex === i ? 'ring-2 ring-indigo-300 ring-inset' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${i + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </button>
              </div>
            )
        )}
        {images.length < 1 && (
          <div className="flex-1 px-2 min-w-max">
            <button
              className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center text-2xl text-gray-400"
              disabled
            >
              <MdImageNotSupported />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ImageGallery
