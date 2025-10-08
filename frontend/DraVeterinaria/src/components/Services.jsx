import React from 'react'
import Syringe from '../three/Syringe'
import Certificate from '../three/Certificate'
import Dog from '../three/Dog'
import Doctor from '../three/Doctor'
import { assets } from '../assets/assets'

const Services = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 place-items-center mb-20'>
        <div className='transition-transform transform duration-500 hover:scale-105'>
           <Syringe/>
            <p className='flex flex-col items-center font-semibold text-2xl'>Vacunas</p>
        </div>
        <div className='transition-transform transform duration-500 hover:scale-105'>
            <Certificate/>
            <p className='flex flex-col items-center font-semibold text-2xl'>Certificado de viajes</p>
        </div>
        <div className='transition-transform transform duration-500 hover:scale-105'>
            <Dog/>
            <p className='flex flex-col items-center font-semibold text-2xl'>Microchip</p>
        </div>
        <div className=' transition-transform transform duration-500 hover:scale-105'>
            <Doctor/>
            <p className='flex flex-col items-center font-semibold text-2xl'>Consultas</p>
        </div>
    </div>
  )
}

export default Services