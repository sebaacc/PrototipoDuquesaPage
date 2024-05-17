import brioche from '../img/cake_1-removebg-preview 1.png'
import cinnabon from '../img/Egg___Bacon-removebg-preview 1.png'
import galletas from '../img/carrot_1-removebg-preview 1.png'
import croissant from '../img/Croissant_Designed_by_FreePik.png'

function Main () {
  return (
    <section>
      <div>
        <h1 className="text-4xl font-black pl-9 pr-9">
          Qué te gustaría ordenar esta vez?
        </h1>
      </div>
      <div className="m-10">
        <input
          className="border p-4 rounded-lg w-[330px] h-[80px] bg-[#D9D9D9] text-black font-medium"
          type="text"
          placeholder="Busca un producto..."
        />
      </div>
      <section className="flex items-center justify-center">
        <article className="m-4">
          <img src={brioche} />
          <p className='flex justify-center'>Brioche</p>
        </article>
        <article className="m-4 flex flex-col">
          <img src={cinnabon} />
          <p className='flex justify-center'>Cinnabon</p>
        </article>
        <article className="m-4">
          <img src={galletas} />
          <p className='flex justify-center'>Galletas</p>
        </article>
        <article className="m-4">
          <img src={croissant} />
          <p className='flex justify-center'>Croissant</p>
        </article>
      </section>
    </section>
  )
}

export default Main
