import Image from 'next/image'
import Link from 'next/link'

import { useGoods } from '#/entities'

interface IProps {
  id: number
  name: string
  price: string
  img: string
}

export const Good = ({ id, name, price, img }: IProps) => {
  const loading = useGoods(state => state.loading)

  if (loading) {
    return (
      <div
        role='status'
        className='min-h-[200px] animate-pulse space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8 lg:max-w-[300px]'
      >
        <div className='flex h-full w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700'>
          <svg
            className='h-12 w-12 text-gray-200'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 640 512'
          >
            <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
          </svg>
        </div>
      </div>
    )
  }
  return (
    <Link
      href={`/good/${id}`}
      className='relative w-full cursor-pointer overflow-hidden bg-gray-200 dark:bg-gray-1000 lg:max-w-[300px]'
    >
      <div className='absolute left-0 top-0 z-10 bg-white font-bold text-black transition-colors hover:bg-purple-800 hover:text-white'>
        <div className='px-3 py-1 text-4xl lg:text-lg'>{name}</div>
        <div className='px-3 py-1 text-xl lg:text-base'>${price} USD</div>
      </div>
      <Image
        src={img}
        alt='img'
        width={200}
        height={200}
        className='w-full transition-all duration-500 hover:scale-110'
      />
    </Link>
  )
}
