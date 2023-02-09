import React, { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}
export const FormButton: FC<IProps> = ({ children }) => {
  return (
    <button
      type='submit'
      className='mx-auto block w-full border-none bg-black p-3 text-sm font-bold text-white hover:opacity-70'
    >
      {children}
    </button>
  )
}
