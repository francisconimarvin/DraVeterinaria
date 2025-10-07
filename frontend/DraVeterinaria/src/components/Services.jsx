import React from 'react'
import Syringe from '../three/Syringe.jsx'
import { assets } from '../assets/assets'

const Services = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 place-items-center mb-20'>
        <div className='transition-transform transform duration-500 hover:scale-105 h-40 w-40'>
   <Syringe/>
   <p className='flex flex-col items-center font-semibold text-2xl'>Vacunas</p>
</div>

        <div className='transition-transform transform duration-500 hover:scale-105'>
            <img className='h-40 w-40 cursor-pointer' src={assets.logoCertificado} alt="" />
            <p className='flex flex-col items-center font-semibold text-2xl'>Certificado de viajes</p>
        </div>
        <div className='transition-transform transform duration-500 hover:scale-105'>
            <img className='h-40 w-40 cursor-pointer' src={assets.logoMicrochip} alt="" />
            <p className='flex flex-col items-center font-semibold text-2xl'>Microchip</p>
        </div>
        <div className=' transition-transform transform duration-500 hover:scale-105'>
            <img className='h-40 w-40 cursor-pointer' src={assets.logoDoctora} alt="" />
            <p className='flex flex-col items-center font-semibold text-2xl'>Consultas</p>
        </div>
    </div>
  )
}

export default Services