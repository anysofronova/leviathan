import { FC, ReactNode } from 'react'

import { authSelectors } from '#/entities'

interface IProps {
  children: ReactNode
  onClick?: () => void
  id?: string
}
export const FormButton: FC<IProps> = ({ children, onClick, id }) => {
  const loading = authSelectors.use.loading()

  return (
    <button
      id={id}
      type='submit'
      className={`mx-auto block w-full border-none bg-black p-3 text-sm font-bold text-white hover:opacity-70 dark:bg-white dark:text-black ${
        loading && 'disabled:opacity-50'
      }`}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
