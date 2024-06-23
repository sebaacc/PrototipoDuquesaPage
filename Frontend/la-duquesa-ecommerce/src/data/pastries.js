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
    name: 'Pastel de Chocolate',
    description: 'Pastel de chocolate decadente con rico glaseado',
    subCategoryName: 'Bizcocho',
    imageURL: pastelChocolate,
    price: 20000, // COP
    stock: 50,
    sold: 120,
    code: 'PC001',
    addedToCart: 50 // Veces añadido al carrito
  },
  {
    id: 2,
    name: 'Tarta de Fresas',
    description: 'Tarta ligera y esponjosa con fresas frescas',
    subCategoryName: 'Tarta',
    imageURL: tortaFresa,
    price: 25000, // COP
    stock: 30,
    sold: 85,
    code: 'TF002',
    addedToCart: 40 // Veces añadido al carrito
  },
  {
    id: 3,
    name: 'Galletas de Mantequilla de Maní',
    description:
      'Galletas de mantequilla de maní masticables con un toque de sal',
    subCategoryName: 'Mantequilla',
    imageURL: galletaMani,
    price: 8000, // COP
    stock: 5,
    sold: 150,
    code: 'GM003',
    addedToCart: 70 // Veces añadido al carrito
  },
  {
    id: 4,
    name: 'Tarta de Manzana',
    description:
      'Tarta de manzana clásica hecha en casa con una corteza hojaldrada',
    subCategoryName: 'Frutas',
    imageURL: tartaManzana,
    price: 22000, // COP
    stock: 40,
    sold: 90,
    code: 'TM004',
    addedToCart: 45 // Veces añadido al carrito
  },
  {
    id: 5,
    name: 'Croissant',
    description: 'Croissant estilo francés, mantecoso y hojaldrado',
    subCategoryName: 'Hojaldre',
    imageURL: croissant,
    price: 7000, // COP
    stock: 200,
    sold: 300,
    code: 'CR005',
    addedToCart: 100 // Veces añadido al carrito
  },
  {
    id: 6,
    name: 'Tarta de Limón',
    description:
      'Tarta de limón con una corteza crujiente de galleta de mantequilla',
    subCategoryName: 'Cítrico',
    imageURL: tartaLimon,
    price: 21000, // COP
    stock: 35,
    sold: 75,
    code: 'TL006',
    addedToCart: 35 // Veces añadido al carrito
  },
  {
    id: 7,
    name: 'Galletas con Chispas de Chocolate',
    description: 'Galletas suaves y masticables con chispas de chocolate',
    subCategoryName: 'Chocolate',
    imageURL: galletaChocolate,
    price: 9000, // COP
    stock: 80,
    sold: 180,
    code: 'GC007',
    addedToCart: 150 // Veces añadido al carrito
  },
  {
    id: 8,
    name: 'Pastel de Terciopelo Rojo',
    description:
      'Pastel de terciopelo rojo húmedo y rico con glaseado de queso crema',
    subCategoryName: 'Terciopelo',
    imageURL: pastelTercipelo,
    price: 24000, // COP
    stock: 25,
    sold: 70,
    code: 'PT008',
    addedToCart: 30 // Veces añadido al carrito
  },
  {
    id: 9,
    name: 'Tarta de Arándanos',
    description: 'Tarta de arándanos jugosa con una corteza hojaldrada',
    subCategoryName: 'Frutas',
    imageURL: tartaArandanos,
    price: 23000, // COP
    stock: 40,
    sold: 65,
    code: 'TA009',
    addedToCart: 25 // Veces añadido al carrito
  },
  {
    id: 10,
    name: 'Eclair de Vainilla',
    description:
      'Eclair relleno de crema de vainilla y cubierto con glaseado de chocolate',
    subCategoryName: 'Hojaldre',
    imageURL: eclairVainilla,
    price: 12000, // COP
    stock: 60,
    sold: 110,
    code: 'EV010',
    addedToCart: 55 // Veces añadido al carrito
  },
  {
    id: 11,
    name: 'Macarons de Frambuesa',
    description: 'Macarons ligeros y crujientes con relleno de frambuesa',
    subCategoryName: 'Macaron',
    imageURL: macaronsFrambuesa,
    price: 15000, // COP
    stock: 70,
    sold: 130,
    code: 'MF011',
    addedToCart: 60 // Veces añadido al carrito
  },
  {
    id: 12,
    name: 'Muffin de Arándanos',
    description: 'Muffin esponjoso con arándanos frescos',
    subCategoryName: 'Muffin',
    imageURL: muffinsArandanos,
    price: 10000, // COP
    stock: 90,
    sold: 140,
    code: 'MA012',
    addedToCart: 70 // Veces añadido al carrito
  },
  {
    id: 13,
    name: 'Tarta de Queso',
    description: 'Tarta de queso cremosa con base de galleta graham',
    subCategoryName: 'Queso',
    imageURL: tartaQueso,
    price: 27000, // COP
    stock: 45,
    sold: 80,
    code: 'TQ013',
    addedToCart: 40 // Veces añadido al carrito
  },
  {
    id: 14,
    name: 'Pan de Plátano',
    description: 'Pan de plátano húmedo con nueces',
    subCategoryName: 'Pan',
    imageURL: panPlatano,
    price: 12000, // COP
    stock: 75,
    sold: 160,
    code: 'PP014',
    addedToCart: 80 // Veces añadido al carrito
  },
  {
    id: 15,
    name: 'Pastel de Zanahoria',
    description: 'Pastel de zanahoria húmedo con glaseado de queso crema',
    subCategoryName: 'Zanahoria',
    imageURL: pastelZanahoria,
    price: 22000, // COP
    stock: 40,
    sold: 100,
    code: 'PZ015',
    addedToCart: 50 // Veces añadido al carrito
  },
  {
    id: 16,
    name: 'Galletas de Avena',
    description: 'Galletas de avena saludables con pasas',
    subCategoryName: 'Avena',
    imageURL: galletaAvena,
    price: 8500, // COP
    stock: 110,
    sold: 130,
    code: 'GA016',
    addedToCart: 60 // Veces añadido al carrito
  },
  {
    id: 17,
    name: 'Galletas de Jengibre',
    description: 'Galletas de jengibre especiadas con un toque de melaza',
    subCategoryName: 'Jengibre',
    imageURL: galletaJenjibre,
    price: 8500, // COP
    stock: 90,
    sold: 120,
    code: 'GJ017',
    addedToCart: 50 // Veces añadido al carrito
  },
  {
    id: 18,
    name: 'Profiteroles',
    description:
      'Profiteroles rellenos de crema y cubiertos con glaseado de chocolate',
    subCategoryName: 'Hojaldre',
    imageURL: profiteroles,
    price: 13000, // COP
    stock: 50,
    sold: 100,
    code: 'PR018',
    addedToCart: 45 // Veces añadido al carrito
  },
  {
    id: 19,
    name: 'Tarta de Moras',
    description: 'Tarta de moras frescas con una corteza hojaldrada',
    subCategoryName: 'Frutas',
    imageURL: tartaMora,
    price: 22000, // COP
    stock: 35,
    sold: 70,
    code: 'TM019',
    addedToCart: 30 // Veces añadido al carrito
  },
  {
    id: 20,
    name: 'Tarta de Durazno',
    description: 'Tarta de durazno jugosa con una corteza hojaldrada',
    subCategoryName: 'Frutas',
    imageURL: tartaDurzano,
    price: 21000, // COP
    stock: 40,
    sold: 65,
    code: 'TD020',
    addedToCart: 25 // Veces añadido al carrito
  },
  {
    id: 21,
    name: 'Cinnamon Roll',
    description: 'Rollos de canela suaves y esponjosos con glaseado',
    subCategoryName: 'Canela',
    imageURL: cinnamonRoll,
    price: 14000, // COP
    stock: 55,
    sold: 90,
    code: 'CR021',
    addedToCart: 40 // Veces añadido al carrito
  },
  {
    id: 22,
    name: 'Brioche',
    description: 'Pan brioche suave y mantecoso',
    subCategoryName: 'Pan',
    imageURL: brioche,
    price: 10000, // COP
    stock: 70,
    sold: 110,
    code: 'BR022',
    addedToCart: 50 // Veces añadido al carrito
  },
  {
    id: 23,
    name: 'Baguette',
    description: 'Baguette crujiente y dorada',
    subCategoryName: 'Pan',
    imageURL: baguette,
    price: 8000, // COP
    stock: 20,
    sold: 140,
    code: 'BG023',
    addedToCart: 60 // Veces añadido al carrito
  },
  {
    id: 24,
    name: 'Cinnamon',
    description: 'Canela 100% pura de alta calidad para tus comidas.',
    subCategoryName: 'Dulce',
    imageURL: cinnamon,
    price: 10000, // COP
    stock: 50,
    sold: 90,
    code: 'CIN024',
    addedToCart: 30 // Veces añadido al carrito
  }
]

export default pastries
