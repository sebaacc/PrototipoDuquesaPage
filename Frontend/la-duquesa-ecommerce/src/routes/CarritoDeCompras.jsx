import CardCarrito from '../components/CardCarrito'
import Navbar from '../components/Navbar'
function CarritoDeCompras () {
  const tortaBrownie = {
    nombre: 'Torta Brownie',
    descripcion: 'alguna descripcion',
    img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
    precio: '62000'
  }
  return (
    <div>
      <Navbar />
      <CardCarrito producto={tortaBrownie} />
    </div>
  )
}

export default CarritoDeCompras
