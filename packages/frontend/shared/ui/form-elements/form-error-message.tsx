import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

export type FormErrorMessageProps = {
  className?: string
}

export const FormErrorMessage = ({ children, className }: PropsWithChildren<FormErrorMessageProps>) => (
  <p className={classNames('flex items-center text-left text-sm text-red-600', className)}>
    <RiErrorWarningLine size={22} />
    <span className='ml-1'>{children}</span>
  </p>
)
