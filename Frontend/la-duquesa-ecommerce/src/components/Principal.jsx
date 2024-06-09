import SearchProduct from './SearchProduct'
import HomeCategories from './HomeCategories'
import MobileHomeCategories from './MobileHomeCategories'

function Principal () {
  return (
    <main>
      <header>
        <h1 className="text-4xl font-black pl-9 pr-9 text-center">
          ¿Qué te gustaría ordenar esta vez?
        </h1>
      </header>
      <SearchProduct />
      <section className="flex items-center justify-center">
        <div className="hidden md:flex justify-center">
          <HomeCategories />
        </div>
        <div className="block md:hidden w-[100%] m-auto mb-20">
          <MobileHomeCategories />
        </div>
      </section>
    </main>
  )
}

export default Principal
