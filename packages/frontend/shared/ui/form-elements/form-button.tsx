'use client'

import { FC, ReactNode } from 'react'

import { loadingAuthStateSelector } from '#/entities'
import { useAppSelector } from '#/shared/hooks'

interface IProps {
  children: ReactNode
  onClick?: () => void
  id?: string
}
export const FormButton: FC<IProps> = ({ children, onClick, id }) => {
  const loading = useAppSelector(loadingAuthStateSelector)
  return (
    <button
      id={id}
      type='submit'
      className={`mx-auto block w-full border-none bg-black p-3 text-sm font-bold text-white hover:opacity-70 ${
        loading && 'disabled:opacity-50'
      }`}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
