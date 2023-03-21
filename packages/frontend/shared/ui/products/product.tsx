import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  id: number
  name: string
  price: string
  img: string
}

export const Product = ({ id, name, price, img }: IProps) => {
  return (
    <Link
      href={`/product/${id}`}
      className='relative w-full cursor-pointer overflow-hidden dark:bg-gray-1000 lg:max-w-[300px]'
    >
      <div className='absolute left-0 top-0 z-10 bg-white font-bold text-black transition-colors hover:bg-purple-800 hover:text-white'>
        <div className='px-4 py-2 text-5xl lg:text-xl'>{name}</div>
        <div className='px-4 py-2 text-xl lg:text-base'>${price} USD</div>
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
