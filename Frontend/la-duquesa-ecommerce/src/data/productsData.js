import chocolate from '../img/choco-chocolate 1.png'
import croissant from '../img/productos/croissant.jpg'
import macaronsFrambuesa from '../img/productos/macarons-de-frambuesa.jpg'
import profiteroles from '../img/productos/profiteroles.jpg'
import baguette from '../img/productos/baguette.png'
import galletaChocolate from '../img/productos/galleta-chispas-chocolate.jpg'
import galletaMani from '../img/productos/galleta-mani.jpg'
import galletaAvena from '../img/productos/galletas-avena.jpg'
import galletaJenjibre from '../img/productos/galletas-jengibre.jpg'
import muffinsArandanos from '../img/productos/muffins-arandanos.jpg'
import panPlatano from '../img/productos/pan-de-platano.jpg'
import pastelTercipelo from '../img/productos/pastel-terciopelo-rojo.jpg'
import pastelZanahoria from '../img/productos/pastel-zanahoria.jpg'
import tartaArandanos from '../img/productos/tarta-de-arandanos.jpg'
import tartaDurzano from '../img/productos/tarta-de-durazno.jpg'
import tartaMora from '../img/productos/tarta-moras.jpg'
import tartaQueso from '../img/productos/tarta-queso.jpg'
import tortaFresa from '../img/productos/tortaDeFresas.jpg'
import tartaLimon from '../img/productos/tortaDeLimon.jpg'
import tartaManzana from '../img/productos/tarta-manzana.jpg'
import eclairVainilla from '../img/productos/eclair-vainilla.jpg'
import pastelChocolate from '../img/productos/pastel-cocolate.jpg'
import cinnamon from '../img/productos/cinnamon.jpg'
import brioche from '../img/productos/brioche.png'
import cinnamonRoll from '../img/productos/RollCanela-lucasguizo-pexels.jpg'

const products = [
  {
    id: 1,
    name: 'torta de chocolate',
    image: chocolate,
    shipping: 'Envío gratis',
    deliveryTime: '20 - 30 min',
    detailLink: '/detalle-de-producto/1',
    type: 'torta fria'
  },
  {
    id: 2,
    name: 'croissant',
    image: croissant,
    shipping: 'Envío gratis',
    deliveryTime: '40 - 50 min',
    detailLink: '/detalle-de-producto/2',
    type: 'Pasteleria'
  },
  {
    id: 3,
    name: 'baguette',
    image: baguette,
    shipping: 'Envío gratis',
    deliveryTime: '20 - 30 min',
    detailLink: '/detalle-de-producto/3',
    type: 'Pasteleria'
  },
  {
    id: 4,
    name: 'macarons de frambuesa',
    image: macaronsFrambuesa,
    shipping: 'Envío gratis',
    deliveryTime: '40 - 50 min',
    detailLink: '/detalle-de-producto/4',
    type: 'Pasteleria'
  },
  {
    id: 5,
    name: 'Tarta de queso',
    image: tartaQueso,
    shipping: 'Envío gratis',
    deliveryTime: '20 - 30 min',
    detailLink: '/detalle-de-producto/5',
    type: 'Tarta'
  },
  {
    id: 6,
    name: 'Galleta con chispas de chocolate',
    image: galletaChocolate,
    shipping: 'Envío gratis',
    deliveryTime: '20 - 30 min',
    detailLink: '/detalle-de-producto/6',
    type: 'Galleta'
  }
]

export default products
