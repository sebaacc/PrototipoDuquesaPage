// Para formatear un precio en el frontend
export const priceFormatter = (precio) => {
  return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
