import React from 'react'

const FilterButton = React.memo(({ filter, currentFilter, onClick }) => (
  <button
    className={`px-4 py-2 rounded-lg shadow-md ${
      filter === currentFilter ? 'bg-[#BD6292] text-white' : 'bg-gray-200 text-gray-700'
    }`}
    onClick={() => onClick(filter)}
  >
    {filter}
  </button>
))

export default FilterButton
