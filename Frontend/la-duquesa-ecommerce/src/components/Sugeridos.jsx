import bread from '../img/bread.png'
import brownie from '../img/brownie.png'

const Sugeridos = () => {
  return (
    <>
      <section className="ml-3 mt-12 p-6">
        <article className="mb-6 max-md:text-center">
          <h4 className="mr-6 font-bold mb-3">
            Planea tu fiesta de la manera mas dulce.
          </h4>
        </article>
        <div className="md:flex lg:flex flex-row justify-around ">
          <article className="flex mb-10 md:mr-6 lg:mr-8">
            <img
              className="w-48 rounded-l-xl object-cover"
              src={brownie}
              alt="brownie"
            />
            <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
              <p className="m-8 text-center">
                Ahorra el <span className="font-semibold">10%</span> llevando
                mas de 10 unidades en cualquier postre!!
              </p>
            </span>
          </article>
          <article className="flex mb-10 lg:min-h-52">
            <img
              className="w-48 rounded-l-xl object-cover"
              src={bread}
              alt="bread"
            />
            <span className="bg-[#D9D9D9] rounded-r-xl p-2 flex flex-col justify-center items-center">
              <p className="m-8 text-center text-lg">
                Prueba nuestro delicioso pan brioche{' '}
                <span className="font-semibold">100%</span> artesanal.
              </p>
            </span>
          </article>
        </div>
      </section>
    </>
  )
}

export default Sugeridos
