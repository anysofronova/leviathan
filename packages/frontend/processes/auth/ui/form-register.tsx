import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { register } from '#/entities/auth'
import { useAppDispatch } from '#/shared/hooks'
import { IUserRegister } from '#/shared/types'
import { FormButton, FormInput, Toast } from '#/shared/ui'

import { registerSchema } from './schema'

type IFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const FormRegister = () => {
  const dispatch = useAppDispatch()
  const [showToast, setShowToast] = useState(false)
  const {
    handleSubmit,
    register: reg,
    formState: { errors },
    reset
  } = useForm<IFormValues>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  const submit: SubmitHandler<IFormValues> = async (body: IUserRegister): Promise<void> => {
    const response = await dispatch(register(body))
    if (response.meta.requestStatus === 'fulfilled') {
      reset()
    } else if (response.meta.requestStatus === 'rejected') {
      setShowToast(true)
    }
  }
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
      {showToast && <Toast showToast={setShowToast} message='Email already exists' />}
      <FormInput<IFormValues>
        name='firstName'
        placeholder='First Name'
        label='First Name'
        className='mb-2'
        register={reg}
        errors={errors}
      />
      <FormInput<IFormValues>
        label='Last Name'
        name='lastName'
        placeholder='Last Name'
        className='mb-2'
        register={reg}
        errors={errors}
      />
      <FormInput<IFormValues>
        name='email'
        placeholder='Email'
        type='email'
        label='Email'
        className='mb-2'
        register={reg}
        errors={errors}
      />
      <FormInput<IFormValues>
        label='Password'
        name='password'
        placeholder='Password'
        type='password'
        className='mb-2'
        register={reg}
        errors={errors}
      />
      <FormButton>Sign Up</FormButton>
    </form>
  )
}
