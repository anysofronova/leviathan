import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormButton, FormInput } from '#/shared/ui'

import { registerSchema } from './schema'

type IFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const FormRegister = () => {
  const {
    handleSubmit,
    register,
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

  const submit: SubmitHandler<IFormValues> = ({ email, password }): void => {
    console.log(email, password)
  }
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
      <FormInput<IFormValues>
        name='firstName'
        placeholder='First Name'
        label='First Name'
        className='mb-2'
        register={register}
        errors={errors}
      />
      <FormInput<IFormValues>
        label='Last Name'
        name='lastName'
        placeholder='Last Name'
        className='mb-2'
        register={register}
        errors={errors}
      />
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
        label='Password'
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
