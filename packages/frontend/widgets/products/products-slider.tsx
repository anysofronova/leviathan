'use client'

import { useState } from 'react'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { v4 } from 'uuid'

import { productStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'
import { Slide } from '#/shared/ui/slide'

export const ProductsSlider = () => {
  const product = useAppSelector(productStateSelector)
  const slides = product?.images
  const [selectedSlide, setSelectedSlide] = useState(0)

  const handleSlideClick = (index: number) => {
    setSelectedSlide(index)
  }

  const handlePreviousClick = () => {
    if (slides) {
      setSelectedSlide((selectedSlide - 1 + slides.length) % slides.length)
    }
  }

  const handleNextClick = () => {
    if (slides) {
      setSelectedSlide((selectedSlide + 1) % slides.length)
    }
  }

  if (!product) {
    return (
      <div role='status' className='h-[450px] w-full animate-pulse md:h-[700px] lg:w-3/5'>
        <div className='h-full w-full bg-gray-200 dark:bg-gray-700'></div>
      </div>
    )
  }

  return (
    <div className='w-full bg-purple-700 dark:bg-purple-800 lg:w-3/5'>
      <div className='relative w-full'>
        <div className='max-w-full overflow-hidden'>
          <div
            className='flex transition-transform duration-300 ease-out'
            style={{ transform: `translateX(-${selectedSlide * 100}%)` }}
          >
            {slides?.map(slide => {
              return <Slide key={v4()} slide={slide} />
            })}
          </div>
        </div>
        <div className='absolute left-0 top-0 text-black'>
          <div className='bg-white py-3 px-4 text-4xl font-bold'>{product?.name}</div>
          <div className='text-md w-max bg-white py-3 px-4 font-bold'>${product?.price} USD</div>
        </div>
        <div className='absolute bottom-5 right-10 text-white'>
          <button
            className='border-2 border-r-0 border-white bg-purple-700 py-3 px-6 transition-colors  hover:bg-purple-900'
            onClick={handlePreviousClick}
          >
            <HiOutlineArrowNarrowLeft size={32} />
          </button>
          <button
            className='border-2 border-white bg-purple-700 py-3 px-6 transition-colors hover:bg-purple-900'
            onClick={handleNextClick}
          >
            <HiOutlineArrowNarrowRight size={32} />
          </button>
        </div>
      </div>
      <div className='flex bg-purple-900'>
        {slides?.map((slide, index) => (
          <div
            key={v4()}
            className={`w-[200px] px-4 ${
              index === selectedSlide ? 'bg-purple-400 dark:bg-purple-700' : 'bg-purple-500 dark:bg-purple-900'
            }`}
            onClick={() => handleSlideClick(index)}
          >
            <img src={slide} alt='slide' />
          </div>
        ))}
      </div>
    </div>
  )
}
