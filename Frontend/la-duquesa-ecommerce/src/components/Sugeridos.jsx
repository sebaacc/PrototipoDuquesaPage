import bread from '../img/bread.png'
import brownie from '../img/brownie.png'

const Sugeridos = () => {
  return (
    <>
      <section className="ml-3 mt-12 p-6">
        <article className="hidden xl:flex flex-row mb-6">
          <h4 className="mr-6">Sugeridos</h4>
          <p className="font-bold text-[#BD6292]">Ver todos</p>
        </article>
        <div className="md:flex lg:flex flex-row justify-around ">
          <article className="flex mb-10 md:mr-6 lg:mr-8">
            <img
              className="w-48 rounded-l-xl object-cover"
              src={brownie}
              alt="brownie"
            />
            <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
              <p className="font-bold mb-3">
                Planea tu fiesta de la manera mas dulce.
              </p>
              <p className="mb-4">
                Ahorra el 10% llevando mas de 10 unidades en cualquier postre !!
              </p>
              <button className="border-2 border-black w-32">
                Busca tu oferta
              </button>
            </span>
          </article>
          <article className="flex mb-10 lg:min-h-52">
            <img
              className="w-48 rounded-l-xl object-cover"
              src={bread}
              alt="bread"
            />
            <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
              <p className="font-bold mb-3">
                Planea tu fiesta de la manera más dulce.
              </p>
              <p className="mb-4">
                Aprovecha nuestro delicioso pan brioche, 100% artesanal.
              </p>
              <button className="border-2 border-black w-32">
                Busca tu oferta
              </button>
            </span>
          </article>
        </div>
      </section>
    </>
  )
}

export default Sugeridos
