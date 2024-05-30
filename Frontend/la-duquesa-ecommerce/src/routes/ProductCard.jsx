import { MdPriceChange } from 'react-icons/md'
import chocolate from '../img/choco-chocolate 1.png'
import { RiCake3Fill } from 'react-icons/ri'
import { CiShoppingCart } from 'react-icons/ci'

function ProductCard () {
  return (
    <div>
      <img src={chocolate} alt="" />
      <article className='bg-[#034748] text-white p-8 rounded-b-lg'>
        <p className='flex mb-3'><RiCake3Fill className='size-6 mr-2'/> Nombre:<span className='font-bold ml-2'>Chocolate</span></p>
        <p className='flex'><MdPriceChange className='size-6 mr-2'/> Precio:<span className='font-bold ml-2'>$14.000</span></p>
      <button className='flex bg-[#BD6292]  mt-4 rounded p-2 m-auto'>
        <CiShoppingCart className='size-6 mr-2'/>
        Agregar al carrito
      </button>
      </article>
    </div>
  )
}

export default ProductCard
