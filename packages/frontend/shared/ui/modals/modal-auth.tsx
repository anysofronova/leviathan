import React, { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}
export const ModalAuth: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='absolute right-1/2 bottom-1/2 z-10 h-auto w-[350px] translate-y-1/2 translate-x-1/2 md:w-[400px]'>
        {children}
      </div>
    </>
  )
}
