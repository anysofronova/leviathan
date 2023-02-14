'use client'

import React, { FC, ReactNode, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

interface IProps {
  selected: string
  children: ReactNode
}
export const LinkSelect: FC<IProps> = ({ selected, children }) => {
  const [showSelect, setShowSelect] = useState(false)
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className='relative w-full border border-gray-400 p-3' onClick={() => setShowSelect(prevState => !prevState)}>
      <p className='text-sm font-medium text-gray-500'>{selected}</p>
      <button className='absolute right-3 top-4'>
        {showSelect ? <FaAngleUp size={18} /> : <FaAngleDown size={18} />}
      </button>
      {showSelect && <div className='absolute top-14 left-0 w-full border bg-white'>{children}</div>}
    </div>
  )
}
