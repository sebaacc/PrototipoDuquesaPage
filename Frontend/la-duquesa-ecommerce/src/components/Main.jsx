import brioche from '../img/cake_1-removebg-preview 1.png'
import cinnamon from '../img/Egg___Bacon-removebg-preview 1.png'
import galletas from '../img/carrot_1-removebg-preview 1.png'
import croissant from '../img/Croissant_Designed_by_FreePik.png'
import torta from '../img/torta_designed_by_freepik.png'
import baguette from '../img/Baguette_designed_by_pikkovia.png'
import { Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// import pudin from '../img/burger 1.png'

function Main () {
  return (
    <main>
      <header>
        <h1 className="text-4xl font-black pl-9 pr-9 sm:text-center">
          ¿Qué te gustaría ordenar esta vez?
        </h1>
      </header>
      <div className="m-10 md:flex justify-center">
        <input
          className="border p-4 rounded-lg w-[330px] h-[80px] bg-[#D9D9D9] text-black font-medium sm:w-[560px] md:w-[600px] lg:w-[630px] xl:w-[1000px]"
          type="text"
          placeholder="Busca un producto..."
          id="search-product"
        />
      </div>

      <section className="flex items-center justify-center">
        <div className="hidden md:flex flex-wrap justify-center">
          <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
            <img
              className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
              src={brioche}
              alt="Brioche"
            />
            <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
              Brioche
            </p>
          </article>
          <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
            <img
              className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
              src={cinnamon}
              alt="Cinnamon"
            />
            <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
              Cinnamon
            </p>
          </article>
          <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
            <img
              className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
              src={galletas}
              alt="Galletas"
            />
            <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
              Galletas
            </p>
          </article>
          <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
            <img
              className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
              src={croissant}
              alt="Croissant"
            />
            <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
              Croissant
            </p>
          </article>
          <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
            <img
              className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
              src={torta}
              alt="Torta Fría"
            />
            <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
              Torta Fría
            </p>
          </article>
          <article className="group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
            <img
              className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
              src={baguette}
              alt="Baguette"
            />
            <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
              Baguette
            </p>
          </article>
        </div>

        <div className="block md:hidden w-[100%] m-auto mb-20">
          <Swiper
            modules={[Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <article className="flex flex-col items-center w-[95px] group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
                <img
                  className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
                  src={brioche}
                  alt="Brioche"
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
                  Brioche
                </p>
              </article>
            </SwiperSlide>
            <SwiperSlide>
              <article className="flex flex-col items-center w-[95px] group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
                <img
                  className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
                  src={cinnamon}
                  alt="Cinnamon"
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
                  Cinnamon
                </p>
              </article>
            </SwiperSlide>
            <SwiperSlide>
              <article className="flex flex-col items-center w-[95px] group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
                <img
                  className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
                  src={galletas}
                  alt="Galletas"
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
                  Galletas
                </p>
              </article>
            </SwiperSlide>
            <SwiperSlide>
              <article className="flex flex-col items-center w-[95px] group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
                <img
                  className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
                  src={croissant}
                  alt="Croissant"
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
                  Croissant
                </p>
              </article>
            </SwiperSlide>
            <SwiperSlide>
              <article className="flex flex-col items-center w-[95px] group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
                <img
                  className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
                  src={torta}
                  alt="Torta Fría"
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
                  Torta Fría
                </p>
              </article>
            </SwiperSlide>
            <SwiperSlide>
              <article className="flex flex-col items-center w-[95px] group font-medium m-4 h-36 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition">
                <img
                  className="hover:bg-white rounded-full w-[80px] h-[80px] transition"
                  src={baguette}
                  alt="Baguette"
                />
                <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-[#e6e6e6]">
                  Baguette
                </p>
              </article>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </main>
  )
}

export default Main
