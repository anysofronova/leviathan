import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '#/entities'
import { IUserLogin } from '#/shared/types'
import { FormButton, FormInput, Toast } from '#/shared/ui'

import { loginSchema } from './schema'

type IFormValues = {
  email: string
  password: string
}
export const FormLogin = () => {
  const login = useAuth(state => state.login)
  const [showToast, setShowToast] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submit: SubmitHandler<IFormValues> = async (body: IUserLogin): Promise<void> => {
    await login(body)
    reset()
  }
  return (
    <>
      {showToast && <Toast showToast={setShowToast} message='Email or password is invalid' />}
      <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
        <FormInput<IFormValues>
          id='login-email'
          name='email'
          placeholder='Email'
          type='email'
          label='Email'
          className='mb-2'
          register={register}
          errors={errors}
        />
        <FormInput<IFormValues>
          id='login-password'
          label='First Name'
          name='password'
          placeholder='Password'
          type='password'
          className='mb-2'
          register={register}
          errors={errors}
        />
        <FormButton id='login-btn'>Log In</FormButton>
      </form>
    </>
  )
}
