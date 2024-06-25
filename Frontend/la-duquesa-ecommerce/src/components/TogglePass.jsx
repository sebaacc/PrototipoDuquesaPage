import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import PropTypes from 'prop-types'

const TogglePass = ({ passVisible, setPassVisible }) => {
  const togglePassVisibility = () => {
    setPassVisible((prev) => !prev)
  }

  return (
    <div>
      <div
        onClick={togglePassVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 text-lg"
      >
        {passVisible ? <MdVisibility /> : <MdVisibilityOff />}
      </div>
    </div>
  )
}
TogglePass.propTypes = {
  passVisible: PropTypes.bool.isRequired,
  setPassVisible: PropTypes.func.isRequired
}

export default TogglePass
