import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export type FormErrorMessageProps = {
  className?: string
}

export const FormErrorMessage = ({ children, className }: PropsWithChildren<FormErrorMessageProps>) => (
  <p className={classNames('block text-left font-serif text-sm text-red-600', className)}>{children}</p>
)
