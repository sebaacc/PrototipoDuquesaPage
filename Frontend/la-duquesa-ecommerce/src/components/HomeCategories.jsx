import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../utils/Loading'
import { shortenUrl } from '../utils/shortenUrl'

const HomeCategories = ({ categories }) => {
  return (
    <>
      {categories
        ? (
            categories.slice(0, 6).map((category) => (
          <Link key={category.id} to={`/tienda?search=${category.id}`}>
            <article className="group font-medium m-4 h-40 rounded-full bg-[#F3F0EC] p-2 hover:bg-[#BD6292] transition duration-300 transform hover:-translate-y-2 active:translate-y-0 w-24 text-center">
              <img
                className="group-hover:bg-white rounded-full w-[80px] h-[80px] transition duration-300 object-cover"
                src={shortenUrl(category.categoryImage)}
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
        <div className="flex justify-center">
          <Loading />
        </div>
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
