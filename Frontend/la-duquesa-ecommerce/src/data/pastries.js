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
    id: 1,
    title: 'Pastel de Chocolate',
    description: 'Pastel de chocolate decadente con rico glaseado',
    type: 'Pastel',
    subtipo: 'Bizcocho',
    image: pastelChocolate,
    price: 20000, // COP
    stock: 50,
    sold: 120,
    code: 'PC001'
  },
  {
    id: 2,
    title: 'Tarta de Fresas',
    description: 'Tarta ligera y esponjosa con fresas frescas',
    type: 'Pastel',
    subtipo: 'Tarta',
    image: tortaFresa,
    price: 25000, // COP
    stock: 30,
    sold: 85,
    code: 'TF002'
  },
  {
    id: 3,
    title: 'Galletas de Mantequilla de Maní',
    description:
      'Galletas de mantequilla de maní masticables con un toque de sal',
    type: 'Galleta',
    subtipo: 'Mantequilla',
    image: galletaMani,
    price: 8000, // COP
    stock: 100,
    sold: 150,
    code: 'GM003'
  },
  {
    id: 4,
    title: 'Tarta de Manzana',
    description:
      'Tarta de manzana clásica hecha en casa con una corteza hojaldrada',
    type: 'Tarta',
    subtipo: 'Frutas',
    image: tartaManzana,
    price: 22000, // COP
    stock: 40,
    sold: 90,
    code: 'TM004'
  },
  {
    id: 5,
    title: 'Croissant',
    description: 'Croissant estilo francés, mantecoso y hojaldrado',
    type: 'Pastelería',
    subtipo: 'Hojaldre',
    image: croissant,
    price: 7000, // COP
    stock: 200,
    sold: 300,
    code: 'CR005'
  },
  {
    id: 6,
    title: 'Tarta de Limón',
    description:
      'Tarta de limón con una corteza crujiente de galleta de mantequilla',
    type: 'Pastelería',
    subtipo: 'Cítrico',
    image: tartaLimon,
    price: 21000, // COP
    stock: 35,
    sold: 75,
    code: 'TL006'
  },
  {
    id: 7,
    title: 'Galletas con Chispas de Chocolate',
    description: 'Galletas suaves y masticables con chispas de chocolate',
    type: 'Galleta',
    subtipo: 'Chocolate',
    image: galletaChocolate,
    price: 9000, // COP
    stock: 80,
    sold: 180,
    code: 'GC007'
  },
  {
    id: 8,
    title: 'Pastel de Terciopelo Rojo',
    description:
      'Pastel de terciopelo rojo húmedo y rico con glaseado de queso crema',
    type: 'Pastel',
    subtipo: 'Terciopelo',
    image: pastelTercipelo,
    price: 24000, // COP
    stock: 25,
    sold: 70,
    code: 'PT008'
  },
  {
    id: 9,
    title: 'Tarta de Arándanos',
    description: 'Tarta de arándanos jugosa con una corteza hojaldrada',
    type: 'Tarta',
    subtipo: 'Frutas',
    image: tartaArandanos,
    price: 23000, // COP
    stock: 40,
    sold: 65,
    code: 'TA009'
  },
  {
    id: 10,
    title: 'Eclair de Vainilla',
    description:
      'Eclair relleno de crema de vainilla y cubierto con glaseado de chocolate',
    type: 'Pastelería',
    subtipo: 'Hojaldre',
    image: eclairVainilla,
    price: 12000, // COP
    stock: 60,
    sold: 110,
    code: 'EV010'
  },
  {
    id: 11,
    title: 'Macarons de Frambuesa',
    description: 'Macarons ligeros y crujientes con relleno de frambuesa',
    type: 'Pastelería',
    subtipo: 'Macaron',
    image: macaronsFrambuesa,
    price: 15000, // COP
    stock: 70,
    sold: 130,
    code: 'MF011'
  },
  {
    id: 12,
    title: 'Muffin de Arándanos',
    description: 'Muffin esponjoso con arándanos frescos',
    type: 'Pastelería',
    subtipo: 'Muffin',
    image: muffinsArandanos,
    price: 10000, // COP
    stock: 90,
    sold: 140,
    code: 'MA012'
  },
  {
    id: 13,
    title: 'Tarta de Queso',
    description: 'Tarta de queso cremosa con base de galleta graham',
    type: 'Tarta',
    subtipo: 'Queso',
    image: tartaQueso,
    price: 27000, // COP
    stock: 45,
    sold: 80,
    code: 'TQ013'
  },
  {
    id: 14,
    title: 'Pan de Plátano',
    description: 'Pan de plátano húmedo con nueces',
    type: 'Pastelería',
    subtipo: 'Pan',
    image: panPlatano,
    price: 12000, // COP
    stock: 75,
    sold: 160,
    code: 'PP014'
  },
  {
    id: 15,
    title: 'Pastel de Zanahoria',
    description: 'Pastel de zanahoria húmedo con glaseado de queso crema',
    type: 'Pastel',
    subtipo: 'Zanahoria',
    image: pastelZanahoria,
    price: 22000, // COP
    stock: 40,
    sold: 90,
    code: 'PZ015'
  },
  {
    id: 16,
    title: 'Galletas de Avena',
    description: 'Galletas crujientes de avena con pasas',
    type: 'Galleta',
    subtipo: 'Avena',
    image: galletaAvena,
    price: 8000, // COP
    stock: 110,
    sold: 170,
    code: 'GA016'
  },
  {
    id: 17,
    title: 'Tarta de Moras',
    description: 'Tarta de moras frescas con corteza dorada',
    type: 'Tarta',
    subtipo: 'Frutas',
    image: tartaMora,
    price: 23000, // COP
    stock: 50,
    sold: 95,
    code: 'TM017'
  },
  {
    id: 18,
    title: 'Profiteroles',
    description:
      'Bolas de masa rellenas de crema pastelera y cubiertas con chocolate',
    type: 'Pastelería',
    subtipo: 'Hojaldre',
    image: profiteroles,
    price: 15000, // COP
    stock: 55,
    sold: 100,
    code: 'PR018'
  },
  {
    id: 19,
    title: 'Galletas de Jengibre',
    description: 'Galletas de jengibre especiadas y crujientes',
    type: 'Galleta',
    subtipo: 'Especias',
    image: galletaJenjibre,
    price: 8500, // COP
    stock: 95,
    sold: 155,
    code: 'GJ019'
  },
  {
    id: 20,
    title: 'Tarta de Durazno',
    description: 'Tarta de durazno jugosa con corteza hojaldrada',
    type: 'Tarta',
    subtipo: 'Frutas',
    image: tartaDurzano,
    price: 23000, // COP
    stock: 40,
    sold: 85,
    code: 'TD020'
  },
  {
    id: 21,
    title: 'Baguette',
    description:
      'Baguette crujiente pan francés de corteza dorada y miga esponjosa.',
    type: 'Pastelería',
    subtipo: 'Pan',
    image: baguette,
    price: 22000, // COP
    stock: 60,
    sold: 100,
    code: 'BG021'
  },
  {
    id: 22,
    title: 'Brioche',
    description: 'Brioche exquisito con esencia de almendra y levadura fresca',
    type: 'Pastelería',
    subtipo: 'Pan',
    image: brioche,
    price: 12000, // COP
    stock: 70,
    sold: 110,
    code: 'BR022'
  },
  {
    id: 23,
    title: 'Cinnamon Roll',
    description:
      'Delicioso y esponjoso pastelito de masa de canela, relleno de azúcar morena y canela.',
    type: 'Pastelería',
    subtipo: 'Hojaldre',
    image: cinnamonRoll,
    price: 10000, // COP
    stock: 80,
    sold: 120,
    code: 'CR023'
  },
  {
    id: 24,
    title: 'Cinnamon',
    description:
      'Canela pura: Delicioso condimento para postres, cafés y más. La unidad equivale a 100g.',
    type: 'Pastelería',
    subtipo: 'Condimento',
    image: cinnamon,
    price: 8000, // COP
    stock: 150,
    sold: 200,
    code: 'CN024'
  }
]

export default pastries
