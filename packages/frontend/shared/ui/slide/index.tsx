import { FC } from 'react'
import { v4 } from 'uuid'

interface IProps {
  slide: string
}

export const Slide: FC<IProps> = ({ slide }) => {
  return (
    <div key={v4()} className='flex min-w-full items-center justify-center'>
      <img src={slide} alt='slide' className='h-auto max-w-[350px] md:max-w-[550px]' />
    </div>
  )
}
