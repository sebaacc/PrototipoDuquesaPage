import React from 'react'
import sedes from '../data/sedesData' // Asegúrate de ajustar la ruta según la ubicación del archivo
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SedeCard = ({ imageSrc, sedeTitle, sedeCityCountry, sedeDescription }) => (
  <div className="rounded-lg border bg-white shadow-sm">
    <div className="relative h-48 overflow-hidden rounded-t-lg">
      <img
        src={imageSrc}
        alt={sedeTitle}
        className="object-cover"
        width="384"
        height="192"
        style={{ aspectRatio: '384 / 192', objectFit: 'cover' }}
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-medium">{sedeTitle}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {sedeCityCountry}
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {sedeDescription}
      </p>
    </div>
  </div>
)

const SedesSection = () => (
  <div>
    <Navbar />
    <section className="w-full pb-8">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Conoce nuestras principales distribuidoras
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Estamos presentes en diferentes ciudades para brindar un mejor
            servicio a nuestros clientes.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sedes.map((sede, index) => (
            <SedeCard
              key={index}
              imageSrc={sede.imageSrc}
              sedeTitle={sede.sedeTitle}
              sedeCityCountry={sede.sedeCityCountry}
              sedeDescription={sede.sedeDescription}
            />
          ))}
        </div>
      </div>
      </section>
  </div>
)

export default SedesSection
