'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations()
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
    <>
      {showToast && <Toast showToast={setShowToast} message='Email already exists' />}
      <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
        <FormInput<IFormValues>
          id='register-first-name'
          name='firstName'
          placeholder={t('First Name')}
          label='First Name'
          className='mb-2'
          register={reg}
          errors={errors}
        />
        <FormInput<IFormValues>
          id='register-last-name'
          label='Last Name'
          name='lastName'
          placeholder={t('Last Name')}
          className='mb-2'
          register={reg}
          errors={errors}
        />
        <FormInput<IFormValues>
          id='register-email'
          name='email'
          placeholder={t('Email')}
          type='email'
          label='Email'
          className='mb-2'
          register={reg}
          errors={errors}
        />
        <FormInput<IFormValues>
          id='register-password'
          label='Password'
          name='password'
          placeholder={t('Password')}
          type='password'
          className='mb-2'
          register={reg}
          errors={errors}
        />
        <FormButton id='register-btn'>{t('Sign Up')}</FormButton>
      </form>
    </>
  )
}
