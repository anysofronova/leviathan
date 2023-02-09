import React, { FC } from 'react'

type InputType = 'email' | 'password' | 'text'

interface IProps {
  type: InputType
  placeholder: string
}

export const FormInput: FC<IProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='mx-auto block w-full min-w-[300px] border-gray-400 placeholder-gray-400 focus:border-gray-400 focus:ring-0'
    />
  )
}
