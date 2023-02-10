import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

export const PageInfo = () => {
  return (
    <div className='flex w-full items-center justify-center bg-black py-28 px-5 text-white'>
      <div className='flex w-full max-w-[900px] flex-col lg:flex-row'>
        <h2 className='mr-5 mb-4 text-left text-4xl font-black leading-none lg:text-right lg:text-6xl'>
          Dessert dragée halvah croissant.
        </h2>
        <div>
          <p className='mb-3 pt-2 text-xl'>
            Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant
            fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie
            carrot cake.
          </p>
          <button className='flex items-center text-2xl font-bold hover:underline'>
            <span className='mr-1'>Read it here</span> <FiArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
