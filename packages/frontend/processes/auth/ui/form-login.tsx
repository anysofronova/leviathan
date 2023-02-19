'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { login } from '#/entities/auth'
import { useAppDispatch } from '#/shared/hooks'
import { IUserLogin } from '#/shared/types'
import { FormButton, FormInput, Toast } from '#/shared/ui'

import { loginSchema } from './schema'

type IFormValues = {
  email: string
  password: string
}
export const FormLogin = () => {
  const dispatch = useAppDispatch()
  const [showToast, setShowToast] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submit: SubmitHandler<IFormValues> = async (body: IUserLogin): Promise<void> => {
    const response = await dispatch(login(body))
    if (response.meta.requestStatus === 'rejected') {
      setShowToast(true)
    }
  }
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
      {showToast && <Toast showToast={setShowToast} message='Email or password is invalid' />}
      <FormInput<IFormValues>
        name='email'
        placeholder='Email'
        type='email'
        label='Email'
        className='mb-2'
        register={register}
        errors={errors}
      />
      <FormInput<IFormValues>
        label='First Name'
        name='password'
        placeholder='Password'
        type='password'
        className='mb-2'
        register={register}
        errors={errors}
      />
      <FormButton>Log In</FormButton>
    </form>
  )
}
