import classNames from 'classnames'
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, Ref } from 'react'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password'

export type InputProps = {
  name: string
  hasErrors?: boolean
  label: string
  ref?: Ref<HTMLInputElement> | undefined
  type?: InputType
  size?: InputSize
  className?: string
  id?: string
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: 'p-3 text-base',
  large: 'p-4 text-base'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, id, label, hasErrors = false, type = 'text', size = 'medium', className = '', placeholder, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={classNames([
          'relative inline-flex w-full border bg-gray-50 leading-none text-gray-700 placeholder-gray-500 dark:border-gray-600 dark:bg-black dark:text-white',
          sizeMap[size],
          className,
          hasErrors
            ? 'border-red-600 focus:border-red-600 focus:ring-0'
            : 'border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-300'
        ])}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
