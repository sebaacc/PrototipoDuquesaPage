import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import endpoints from '../utils/endpoints'
import PropTypes from 'prop-types'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const HomeCategories = () => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(endpoints.getCategory)
        console.log(response.data)

        if (response.status === 200) {
          console.log(response.data)
          const shuffledCategories = shuffleArray(response.data)
          setCategories(shuffledCategories)
        } else {
          console.error('Error: Response status is not 200 OK', response.status)
        }
      } catch (error) {
        console.error('Error getting categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      {categories
        ? (
            categories.slice(0, 6).map((category) => (
          <Link key={category.id} to={`/tienda?search=${category.name}`}>
            <article className="group font-medium m-4 h-40 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition duration-300 transform hover:-translate-y-2 active:translate-y-0 w-24 text-center">
              <img
                className="group-hover:bg-white rounded-full w-[80px] h-[80px] transition duration-300"
                src={category.categoryImage}
                alt={category.name}
              />
              <p className="flex justify-center font-bold text-[#7B7B7B] group-hover:text-white transition duration-300 capitalize text-sm mt-2">
                {category.name}
              </p>
            </article>
          </Link>
            ))
          )
        : (
        <>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#BD6292]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </>
          )}
    </>
  )
}

HomeCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryImage: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
}

export default HomeCategories
