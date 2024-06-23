const BASE_URL = 'https://8466-2800-e2-b580-1797-112-1e7b-cf4d-3117.ngrok-free.app' // cambiar este endpoint cuando se necesite

const endpoints = {
  getAndPostUser: `${BASE_URL}/users`, // se puede registrar un usuario u obtener los usuarios, cambiando entre post y get, y además cambiando la data/requested_Options que se le pasan
  SaveUser: `${BASE_URL}/users/save`,
  postLogin: `${BASE_URL}/users/login`,
  postLogout: `${BASE_URL}/users/logout`,
  // getProducts: `${BASE_URL}/products`,
  // getOrders: `${BASE_URL}/orders`
  getMostAddedProducts: `${BASE_URL}/cart/cartInfo/findMostAddedProducts`,
  postForgotPass: `${BASE_URL}/users/forgot-password`
}

export default endpoints
