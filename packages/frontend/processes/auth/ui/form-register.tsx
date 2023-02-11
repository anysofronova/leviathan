import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormButton, FormInput } from '#/shared/ui'

interface IFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

const schema = yup.object().shape({
  firstName: yup.string().required('required field').min(5, 'minimum 5 characters').max(30, 'maximum 30 characters'),
  lastName: yup.string().required('required field').min(5, 'minimum 5 characters').max(30, 'maximum 30 characters'),
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .email('invalid email')
    .max(30, 'maximum 30 characters'),
  password: yup.string().required('required field').min(8, 'minimum 8 characters').max(30, 'maximum 30 characters')
})

export const FormRegister = () => {
  const { handleSubmit, control } = useForm<IFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
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
      <FormInput control={control} name='firstName' placeholder='First Name' type='text' />
      <FormInput control={control} name='lastName' placeholder='Last Name' type='text' />
      <FormInput control={control} name='email' placeholder='Email' type='email' />
      <FormInput control={control} name='password' placeholder='Password' type='password' />

      <FormButton>Log In</FormButton>
    </form>
  )
}
