import croissant from '../img/productos/croissant.jpg'
import galletaChocolate from '../img/productos/galleta-chispas-chocolate.jpg'
import galletaMani from '../img/productos/galleta-mani.jpg'
import galletaAvena from '../img/productos/galletas-avena.jpg'
import galletaJenjibre from '../img/productos/galletas-jengibre.jpg'
import macaronsFrambuesa from '../img/productos/macarons-de-frambuesa.jpg'
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
import profiteroles from '../img/productos/profiteroles.jpg'
import pastelChocolate from '../img/productos/pastel-cocolate.jpg'
import cinnamon from '../img/productos/cinnamon.jpg'
import brioche from '../img/productos/brioche.png'
import baguette from '../img/productos/baguette.png'
import cinnamonRoll from '../img/productos/RollCanela-lucasguizo-pexels.jpg'

const pastries = [
  {
    title: 'Pastel de Chocolate',
    description: 'Pastel de chocolate decadente con rico glaseado',
    type: 'Pastel',
    image: pastelChocolate,
    price: 20000 // COP
  },
  {
    title: 'Tarta de Fresas',
    description: 'Tarta ligera y esponjosa con fresas frescas',
    type: 'Pastel',
    image: tortaFresa,
    price: 25000 // COP
  },
  {
    title: 'Galletas de Mantequilla de Maní',
    description:
      'Galletas de mantequilla de maní masticables con un toque de sal',
    type: 'Galleta',
    image: galletaMani,
    price: 8000 // COP
  },
  {
    title: 'Tarta de Manzana',
    description:
      'Tarta de manzana clásica hecha en casa con una corteza hojaldrada',
    type: 'Tarta',
    image: tartaManzana,
    price: 22000 // COP
  },
  {
    title: 'Croissant',
    description: 'Croissant estilo francés, mantecoso y hojaldrado',
    type: 'Pastelería',
    image: croissant,
    price: 7000 // COP
  },
  {
    title: 'Tarta de Limón',
    description:
      'Tarta de limón con una corteza crujiente de galleta de mantequilla',
    type: 'Pastelería',
    image: tartaLimon,
    price: 21000 // COP
  },
  {
    title: 'Galletas con Chispas de Chocolate',
    description: 'Galletas suaves y masticables con chispas de chocolate',
    type: 'Galleta',
    image: galletaChocolate,
    price: 9000 // COP
  },
  {
    title: 'Pastel de Terciopelo Rojo',
    description:
      'Pastel de terciopelo rojo húmedo y rico con glaseado de queso crema',
    type: 'Pastel',
    image: pastelTercipelo,
    price: 24000 // COP
  },
  {
    title: 'Tarta de Arándanos',
    description: 'Tarta de arándanos jugosa con una corteza hojaldrada',
    type: 'Tarta',
    image: tartaArandanos,
    price: 23000 // COP
  },
  {
    title: 'Eclair de Vainilla',
    description:
      'Eclair relleno de crema de vainilla y cubierto con glaseado de chocolate',
    type: 'Pastelería',
    image: eclairVainilla,
    price: 12000 // COP
  },
  {
    title: 'Macarons de Frambuesa',
    description: 'Macarons ligeros y crujientes con relleno de frambuesa',
    type: 'Pastelería',
    image: macaronsFrambuesa,
    price: 15000 // COP
  },
  {
    title: 'Muffin de Arándanos',
    description: 'Muffin esponjoso con arándanos frescos',
    type: 'Pastelería',
    image: muffinsArandanos,
    price: 10000 // COP
  },
  {
    title: 'Tarta de Queso',
    description: 'Tarta de queso cremosa con base de galleta graham',
    type: 'Tarta',
    image: tartaQueso,
    price: 27000 // COP
  },
  {
    title: 'Pan de Plátano',
    description: 'Pan de plátano húmedo con nueces',
    type: 'Pastelería',
    image: panPlatano,
    price: 12000 // COP
  },
  {
    title: 'Pastel de Zanahoria',
    description: 'Pastel de zanahoria húmedo con glaseado de queso crema',
    type: 'Pastel',
    image: pastelZanahoria,
    price: 22000 // COP
  },
  {
    title: 'Galletas de Avena',
    description: 'Galletas crujientes de avena con pasas',
    type: 'Galleta',
    image: galletaAvena,
    price: 8000 // COP
  },
  {
    title: 'Tarta de Moras',
    description: 'Tarta de moras frescas con corteza dorada',
    type: 'Tarta',
    image: tartaMora,
    price: 23000 // COP
  },
  {
    title: 'Profiteroles',
    description:
      'Bolas de masa rellenas de crema pastelera y cubiertas con chocolate',
    type: 'Pastelería',
    image: profiteroles,
    price: 15000 // COP
  },
  {
    title: 'Galletas de Jengibre',
    description: 'Galletas de jengibre especiadas y crujientes',
    type: 'Galleta',
    image: galletaJenjibre,
    price: 8500 // COP
  },
  {
    title: 'Tarta de Durazno',
    description: 'Tarta de durazno jugosa con corteza hojaldrada',
    type: 'Tarta',
    image: tartaDurzano,
    price: 23000 // COP
  },
  {
    title: 'Baguette',
    description:
      'Baguette crujiente pan francés de corteza dorada y miga esponjosa.',
    type: 'Pastelería',
    image: baguette,
    price: 22000 // COP
  },
  {
    title: 'Brioche',
    description: 'Brioche exquisito con esencia de almendra y levadura fresca',
    type: 'Pastelería',
    image: brioche,
    price: 12000 // COP
  },
  {
    title: 'Cinnamon Roll',
    description:
      'Delicioso y esponjoso pastelito de masa de canela, relleno de azúcar morena y canela.',
    type: 'Pastelería',
    image: cinnamonRoll,
    price: 10000 // COP
  },
  {
    title: 'Cinnamon',
    description:
      'Canela pura: Delicioso condimento para postres, cafés y más. La unidad equivale a 100g.',
    type: 'Pastelería',
    image: cinnamon,
    price: 8000 // COP
  }
]

export default pastries
