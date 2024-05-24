import PropTypes from 'prop-types'

function CardCarrito ({ producto }) {
  const { nombre, img, precio } = producto

  return (
    <article className="flex mb-10 md:mr-6 lg:mr-8 ml-10 mt-8">
      <img className="w-48 rounded-l-xl object-cover" src={img} alt={nombre} />
      <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
        <p className="font-bold mb-3">{nombre}</p>
        <p className="mb-4">Cantidad</p>
        <p className="mb-4">{precio}</p>
        <p className="mb-4">Envío: Gratis</p>
      </span>
    </article>
  )
}

// Validación de tipos de props
CardCarrito.propTypes = {
  producto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired
  }).isRequired
}

export default CardCarrito
