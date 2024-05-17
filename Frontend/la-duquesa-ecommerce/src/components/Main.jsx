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
      <section className="flex items-center justify-center p-2">
        <div className="font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] hover:text-slate-50">
          <article>
            <img className="hover:bg-white rounded-full" src={brioche} />
            <p className="flex justify-center">Brioche</p>
          </article>
        </div>
        <div className="font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] hover:text-slate-50">
          <img className="hover:bg-white rounded-full" src={cinnabon} />
          <p className="flex justify-center">Cinnabon</p>
        </div>
        <div className="font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] hover:text-slate-50">
          <img className="hover:bg-white rounded-full" src={galletas} />
          <p className="flex justify-center">Galletas</p>
        </div>
        <div className="font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] hover:text-slate-50">
          <img className="hover:bg-white rounded-full" src={croissant} />
          <p className="flex justify-center">Croissant</p>
        </div>
      </section>
    </section>
  )
}

export default Main
