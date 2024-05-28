import PropTypes from 'prop-types'
import { useState } from 'react'

function CardCarrito ({ producto, setProductos }) {
  const { nombre, img, precio, cantidad } = producto
  // Define el estado para el valor seleccionado del select
  const [selectedValue, setSelectedValue] = useState('opcion2') // Valor por defecto

  // Maneja el cambio del valor seleccionado
  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    const newQuantity = parseInt(event.target.value, 10)
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.nombre === producto.nombre ? { ...p, cantidad: newQuantity } : p
      )
    )
    console.log('valor seleccionado' + selectedValue)
  }

  return (
    <>
      <div className="w-11/12 self-center flex mb-10 md:mr-6 md:justify-center lg:mr-8 mt-8 border-2 border-[#D1D1D1] rounded-xl">
        <img
          className="w-2/4 rounded-l-xl object-cover"
          src={img}
          alt={nombre}
        />
        <span className="w-2/4 bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
          <p className="font-bold mb-3">{nombre}</p>
          <div className=" flex gap-2">
            <p className="mb-4">Cantidad:</p>

            <select
              className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
              value={producto.cantidad}
              onChange={handleChange}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <p className="mb-4 text-[#2D5651]">${precio * cantidad}</p>
          <p className="mb-4  text-[#2D5651]">Envío: Gratis</p>
        </span>
      </div>
    </>
  )
}

// Validación de tipos de props
CardCarrito.propTypes = {
  producto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired
  }).isRequired,
  setProductos: PropTypes.func.isRequired
}

export default CardCarrito
