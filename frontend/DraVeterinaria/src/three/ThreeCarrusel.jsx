import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

import Syringe from '../three/Syringe'
import Certificate from '../three/Certificate'
import Dog from '../three/Dog'
import Doctor from '../three/Doctor'

const ThreeCarrusel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] w-full bg-transparent mb-40">
      <h1 className="text-4xl font-bold mb-8 text-center text-amber-100">Nuestros Servicios</h1>

      <Swiper
        effect={'flip'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full max-w-5xl"
      >
        <SwiperSlide className="flex justify-center items-center w-[400px] h-[400px]">
          <Doctor />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center w-[400px] h-[400px]">
          <Syringe />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center w-[400px] h-[400px]">
          <Certificate />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center w-[400px] h-[400px]">
          <Dog />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default ThreeCarrusel
