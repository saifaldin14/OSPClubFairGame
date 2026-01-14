import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'
import OSPIntroSlide from './slides/OSPIntroSlide'
import GameSlide from './slides/GameSlide'
import OrphanageSimGame from './slides/OrphanageSimGame'
import ImpactVisualizerGame from './slides/ImpactVisualizerGame'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './App.css'
import './game.css'
import './carousel.css'

function App() {
  const [swiperInstance, setSwiperInstance] = useState(null)

  return (
    <div className="app carousel-app" tabIndex={0}>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          forceToAxis: true,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
          pageUpDown: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => {
          // Prevent any automatic slide changes
          swiper.allowSlidePrev = true
          swiper.allowSlideNext = true
        }}
        className="main-swiper"
        allowTouchMove={true}
        preventInteractionOnTransition={false}
        watchOverflow={true}
        simulateTouch={false}
        touchEventsTarget="container"
      >
        {/* Slide 1: OSP Intro */}
        <SwiperSlide>
          <OSPIntroSlide swiper={swiperInstance} />
        </SwiperSlide>

        {/* Slide 2: Game Intro + Game */}
        <SwiperSlide>
          <GameSlide swiper={swiperInstance} />
        </SwiperSlide>

        {/* Slide 3: Orphanage Simulation Game */}
        <SwiperSlide>
          <OrphanageSimGame swiper={swiperInstance} />
        </SwiperSlide>

        {/* Slide 4: Impact Visualizer Game */}
        <SwiperSlide>
          <ImpactVisualizerGame swiper={swiperInstance} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default App
