import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { v4 } from 'uuid'

interface IProps {
  mockItems: { id: number; img: string; price: number; name: string }[]
}
export const ProductBanner: FC<IProps> = ({ mockItems }) => {
  const path = usePathname()
  return (
    <div className='relative flex overflow-x-hidden bg-black'>
      <div className='flex h-[300px] animate-bannerAnim whitespace-nowrap text-black'>
        {mockItems.map(el => {
          return (
            <div key={v4()} className='relative mr-auto flex h-full min-w-[400px] items-center md:min-w-[500px]'>
              <img src={el.img} className='-mr-32 h-full' alt='img' />
              <Link
                href={`${path?.split('/')[1]}/product/${el.name}`}
                className='bg-white py-2 px-10 text-2xl font-bold'
              >
                {el.name}
              </Link>
            </div>
          )
        })}
      </div>

      <div className='absolute top-0 flex h-[300px] animate-bannerAnim2 whitespace-nowrap text-black'>
        {mockItems.map(el => {
          return (
            <div key={v4()} className='relative mr-auto flex h-full min-w-[400px] items-center md:min-w-[500px]'>
              <img src={el.img} className='-mr-32 h-full' alt='img' />
              <Link
                href={`${path?.split('/')[1]}/product/${el.name}`}
                className='bg-white py-2 px-10 text-2xl font-bold'
              >
                {el.name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
