const BASE_URL = 'https://got-father-catalyst-output.trycloudflare.com'

const endpoints = {
  getAndPostUser: `${BASE_URL}/users`, // se puede registrar un usuario u obtener los usuarios, cambiando entre post y get, y además cambiando la data/requested_Options que se le pasan
  SaveUser: `${BASE_URL}/users/save`,
  postLogin: `${BASE_URL}/users/login`,
  postLogout: `${BASE_URL}/users/logout`,
  // getProducts: `${BASE_URL}/products`,
  // getOrders: `${BASE_URL}/orders`
  getMostAddedProducts: `${BASE_URL}/cart/cartInfo/findMostAddedProducts`,
  postForgotPass: `${BASE_URL}/users/forgot-password`,
  getUser: `${BASE_URL}/users`,
  postCategory: `${BASE_URL}/product/category/createCategory`,
  categories: `${BASE_URL}/product/category/findAllCategories`,
  postSubcategory: `${BASE_URL}/product/subCategory/createSubCategory`,
  getSubcategories: `${BASE_URL}/product/subCategory/findAllSubCategories`,
  postProduct: `${BASE_URL}/product/product/createProduct`,
  getProductById: `${BASE_URL}/product/product/findProductById`,
  postToCart: `${BASE_URL}/cart/cartInfo/addProductToCart`,
  getFromCart: `${BASE_URL}/cart/cartInfo/findCartProducts`,
  deleteFromCart: `${BASE_URL}/cart/cartInfo/removeProductFromCart`,
  clearCart: `${BASE_URL}/cart/cartInfo/clearCart`,
  getProduct: `${BASE_URL}/product/product/findAllProducts`,
  getCategory: `${BASE_URL}/product/category/findAllCategories`,
  getProductPaginate: `${BASE_URL}/product/product/paginated?`,
  putToCart: `${BASE_URL}/cart/cartInfo/changeProductAmount`
}

export default endpoints
