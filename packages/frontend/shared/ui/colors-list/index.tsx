import { Dispatch, SetStateAction } from 'react'
import { BiCheck } from 'react-icons/bi'

import { Good } from '#/shared/types'

interface Props {
  good: Good | null
  clothesColor: string
  setClothesColor: Dispatch<SetStateAction<string>>
}
export const ColorsList = ({ good, clothesColor, setClothesColor }: Props) => {
  return (
    <div className='flex'>
      {good?.colors?.map((color, i) => {
        return (
          <button
            key={color}
            className={`m-1 flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110 ${
              clothesColor === color || (clothesColor === '' && i === 0)
                ? 'border-2 border-black dark:border-white'
                : 'border border-gray-500'
            }`}
            style={{ backgroundColor: color, color: color === '#000' ? '#fff' : '#000' }}
            onClick={() => setClothesColor(color)}
          >
            {(clothesColor === color || (clothesColor === '' && i === 0)) && <BiCheck size={36} />}
          </button>
        )
      })}
    </div>
  )
}
