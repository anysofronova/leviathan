import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const SidebarCart: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className='h-modal fixed inset-0 top-0 left-0 right-0 h-full w-full overflow-y-auto overflow-x-hidden bg-black p-4 opacity-50' />
      <div className='fixed right-0 top-0 z-10 flex min-h-full w-full flex-col bg-white p-4 md:w-[400px]'>
        {children}
      </div>
    </>
  )
}
