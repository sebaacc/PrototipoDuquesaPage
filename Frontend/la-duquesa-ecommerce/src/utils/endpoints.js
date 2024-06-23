const BASE_URL = 'https://d5bd-191-92-149-51.ngrok-free.app'

const endpoints = {
  getAndPostUser: `${BASE_URL}/users`, // se puede registrar un usuario u obtener los usuarios, cambiando entre post y get, y además cambiando la data/requested_Options que se le pasan
  SaveUser: `${BASE_URL}/users/save`,
  postLogin: `${BASE_URL}/users/login`,
  postLogout: `${BASE_URL}/users/logout`,
  // getProducts: `${BASE_URL}/products`,
  // getOrders: `${BASE_URL}/orders`
  getMostAddedProducts: `${BASE_URL}/cart/cartInfo/findMostAddedProducts/`,
  getUser: `${BASE_URL}/users`
}

export default endpoints
