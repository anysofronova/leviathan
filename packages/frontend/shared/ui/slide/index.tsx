import Image from 'next/image'
import { FC } from 'react'

interface IProps {
  slide: string
}

export const Slide: FC<IProps> = ({ slide }) => {
  return (
    <div className='flex min-w-full items-center justify-center'>
      <Image src={slide} width={1000} height={1000} alt='slide' className='h-full max-w-[350px] md:max-w-[600px]' />
    </div>
  )
}
