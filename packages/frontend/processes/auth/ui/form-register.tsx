import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { register } from '#/entities/auth'
import { useAppDispatch } from '#/shared/hooks'
import { IUserRegister } from '#/shared/types'
import { FormButton, FormInput } from '#/shared/ui'

import { registerSchema } from './schema'

type IFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const FormRegister = () => {
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    register: reg,
    formState: { errors }
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
    console.log(response)
  }
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
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
      <FormButton>Sign In</FormButton>
    </form>
  )
}
