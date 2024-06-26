import SearchProduct from './SearchProduct'
import HomeCategories from './HomeCategories'
import MobileHomeCategories from './MobileHomeCategories'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import endpoints from '../utils/endpoints'

function Principal () {
  const [animationParent] = useAutoAnimate()
  const [categories, setCategories] = useState()

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(endpoints.getCategory)
        console.log(response.data)

        if (response.status === 200) {
          console.log(response.data)
          const shuffledCategories = shuffleArray(response.data)
          setCategories(shuffledCategories)
        } else {
          console.error('Error: Response status is not 200 OK', response.status)
        }
      } catch (error) {
        console.error('Error getting categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <main>
      <header>
        <h1 className="text-4xl font-black pl-9 pr-9 text-center">
          ¿Qué te gustaría ordenar esta vez?
        </h1>
      </header>
      <SearchProduct />
      <section className="flex items-center justify-center">
        <div ref={animationParent} className="hidden md:flex justify-center">
          <HomeCategories categories={categories} />
        </div>
        <div className="block md:hidden w-[85%]  m-auto mb-20">
          <MobileHomeCategories categories={categories} />
        </div>
      </section>
    </main>
  )
}

export default Principal
