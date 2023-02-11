import classNames from 'classnames'
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, Ref } from 'react'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email'

export type InputProps = {
  id: string
  name: string
  label: string
  ref?: Ref<HTMLInputElement> | undefined
  type?: InputType
  size?: InputSize
  className?: string
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: 'p-3 text-base',
  large: 'p-4 text-base'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, type = 'text', size = 'medium', className = '', placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={classNames([
          'relative inline-flex w-full rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30',
          sizeMap[size],
          className
        ])}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
