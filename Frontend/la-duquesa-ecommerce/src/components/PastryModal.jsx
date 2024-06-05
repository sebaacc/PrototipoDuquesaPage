import React from 'react'

const PastryModal = ({ pastry, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-lg w-full">
        <div className="h-64 w-full flex items-center justify-center overflow-hidden mb-4 rounded-lg">
          <img
            src={pastry.image}
            alt={pastry.title}
            className="object-cover h-full w-full"
          />
        </div>
        <h2 className="text-xl font-semibold mb-2">{pastry.title}</h2>
        <p className="text-gray-600 mb-2">{pastry.description}</p>
        <p className="text-gray-800 font-bold">{pastry.type}</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-[#BD6292] text-white px-4 py-2 rounded-lg shadow-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default PastryModal
