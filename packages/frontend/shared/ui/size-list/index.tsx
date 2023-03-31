import { Dispatch, SetStateAction } from 'react'

import { Good } from '#/shared/types'

interface Props {
  good: Good | null
  clothesSize: string
  setClothesSize: Dispatch<SetStateAction<string>>
}
export const SizeList = ({ good, clothesSize, setClothesSize }: Props) => {
  return (
    <div className='flex'>
      {good?.sizes?.map((size, i) => {
        if (size !== 'ONE_SIZE') {
          return (
            <button
              key={size}
              className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-1000 ${
                clothesSize === size || (clothesSize === '' && i === 0)
                  ? 'border-2 border-black dark:border-white'
                  : 'border border-gray-500'
              }`}
              onClick={() => setClothesSize(size)}
            >
              {size}
            </button>
          )
        } else return null
      })}
    </div>
  )
}
