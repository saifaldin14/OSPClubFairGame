import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import OSPIntroSlide from './slides/OSPIntroSlide'
import GameSlide from './slides/GameSlide'
import OrphanageSimGame from './slides/OrphanageSimGame'
import ImpactVisualizerGame from './slides/ImpactVisualizerGame'
import GetInvolvedSlide from './slides/GetInvolvedSlide'

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
    <div className="app carousel-app">
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        onSwiper={setSwiperInstance}
        className="main-swiper"
        allowTouchMove={false}
        nested={true}
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

        {/* Slide 5: Get Involved */}
        <SwiperSlide>
          <GetInvolvedSlide swiper={swiperInstance} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default App
