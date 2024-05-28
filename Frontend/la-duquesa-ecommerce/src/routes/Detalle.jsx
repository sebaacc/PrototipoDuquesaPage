import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Objeto = [
  {
    nombre: 'Torta Brownie',
    descripcion: 'alguna descripcion',
    img: 'https://aprende.com/wp-content/uploads/2020/10/brownies-postre_opt-940x580.jpg',
    precio: '62000',
    cantidad: 1
  }]

const Detalle = () => {
  return (
    <>
    <div>
    <Navbar/>
    <div>
        <h1>Detalle de Producto</h1>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Detalle
