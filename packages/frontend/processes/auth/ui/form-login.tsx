import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authSelectors } from '#/entities'
import { IUserLogin } from '#/shared/types'
import { FormButton, FormInput, Toast } from '#/shared/ui'

import { loginSchema } from './schema'

type IFormValues = {
  email: string
  password: string
}
export const FormLogin = () => {
  const login = authSelectors.use.login()
  const [showToast, setShowToast] = useState(false)
  const { t } = useTranslation()
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
          placeholder={t('Email')}
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
          placeholder={t('Password')}
          type='password'
          className='mb-2'
          register={register}
          errors={errors}
        />
        <FormButton id='login-btn'>{t('Log In')}</FormButton>
      </form>
    </>
  )
}
