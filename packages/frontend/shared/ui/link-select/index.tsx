'use client'

import { FC, ReactNode, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

interface IProps {
  selected: string
  children: ReactNode
}
export const LinkSelect: FC<IProps> = ({ selected, children }) => {
  const [showSelect, setShowSelect] = useState(false)
  return (
    <>
      <div
        className='relative mb-1 w-full border border-gray-400 p-3 dark:border-gray-600 dark:bg-black dark:text-white'
        onClick={() => setShowSelect(prevState => !prevState)}
      >
        <p className='text-sm font-medium text-gray-500 dark:text-white'>{selected}</p>
        <button className='absolute right-3 top-4'>
          {showSelect ? <FaAngleUp size={18} /> : <FaAngleDown size={18} />}
        </button>
      </div>
      {showSelect && (
        <div className='top-14 left-0 z-[60] w-full bg-white dark:border-white dark:text-white'>{children}</div>
      )}
    </>
  )
}
