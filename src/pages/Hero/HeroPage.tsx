import { ArrowLongLeftBtn, ArrowLongRightBtn, HotelIcon, TicketIcon } from '@/components/ui'
import classes from '../../styles/HeroPage.module.css'
import { useState } from 'react'
import Carousel from '@/components/Carousel'

const sliderContent = [
  {
    id: 1,
    title: 'Cada experiencia es unica y nosotros te la brindamos',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, placeat numquam maxime nam officia repellendus ducimus assumenda eius alias',
    image: 'brasil-hero.jpg'
  },
  {
    id: 2,
    title: 'Conoce los mejores lugares que tenemos para ofrecerte',
    description: 'Reserva tu lugar con nosotros y disfruta de la mejor experiencia',
    image: 'brasil-buzios.jpg'
  },
  {
    id: 3,
    title: 'Viaja con nosotros y disfruta de la mejor experiencia',
    description: 'Relajate, nostros nos encargamos de todo por ti',
    image: 'brasil-bombinhas.webp'
  }
]

const images = [
  'brasil-hero.jpg',
  'brasil-buzios.jpg',
  'brasil-bombinhas.webp'
]

export const HeroPage = () => {
  const [current, setCurrent] = useState( 0 )
  const length = sliderContent.length
  
  const nextSlide = () => {
    setCurrent( current === length - 1 ? 0 : current + 1 )
  }

  const { CarouselContent, previous, next } = Carousel( {
    sliderContent
  } );

  return (
    <section className={classes.container}>
      <article className={classes.hero}>
      
        {CarouselContent}
    
      </article>

      <article className={classes.hero_second}>
        <h1>Experimenta la nueva aventura con nosotros</h1>
        <section>
          <HotelIcon />
          <p>Best of Hotel</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad cum eveniet ipsum ea nihil, commodi ullam consequuntur</p>
        </section>
        <section>
          <TicketIcon />
          <p>Viajes de clase mundial</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad cum eveniet ipsum ea nihil, commodi ullam consequuntur</p>
        </section>
        <button>Ver más</button>
      </article>
    </section>
  )
}
