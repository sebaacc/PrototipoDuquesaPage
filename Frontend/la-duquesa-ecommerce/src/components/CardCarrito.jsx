import PropTypes from 'prop-types'
import { useState } from 'react'

function CardCarrito ({ producto, setProductos }) {
  const { nombre, img, precio, cantidad } = producto
  // Define el estado para el valor seleccionado del select
  const [selectedValue, setSelectedValue] = useState('opcion2') // Valor por defecto
  const precioFormateado = (precio * cantidad).toLocaleString('es-ES')

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
      <div className="w-11/12 flex m-auto mt-5 mb-5 border-2 border-[#D1D1D1] rounded-xl">
        <img
          className="w-2/4 rounded-l-xl object-cover"
          src={img}
          alt={nombre}
        />
        <span className="w-2/4 bg-[#D9D9D9] rounded-r-xl p-3 flex flex-col justify-center max-md:items-start lg:items-center">
          <p className="font-bold mb-3">{nombre}</p>
          <div className="flex max-sm:flex-col lg:flex-row items-center">
            <p className="font-light mr-2">Cantidad:</p>

            <select
              className="py-1 px-1 border border-[#2D5651] mr-6 focus:outline-none rounded text-lg text-center"
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

          <p className="mb-4 mt-4 text-[#2D5651] font-normal font-sans">
            ${precioFormateado}
          </p>
          <div className=" flex gap-2">
            <p className=" font-light">Envío:</p>
            <span className="text-[#2D5651] font-semibold">Gratis</span>
          </div>
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
