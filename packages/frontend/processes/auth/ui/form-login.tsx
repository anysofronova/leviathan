import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormButton, FormInput } from '#/shared/ui'

interface IFormValues {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .email('invalid email')
    .max(30, 'maximum 30 characters'),
  password: yup.string().required('required field').min(8, 'minimum 8 characters').max(30, 'maximum 30 characters')
})

export const FormLogin = () => {
  const { handleSubmit, control } = useForm<IFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submit: SubmitHandler<IFormValues> = ({ email, password }): void => {
    console.log(email, password)
  }
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3' onSubmit={handleSubmit(submit)}>
      <FormInput control={control} name='email' placeholder='Email' type='email' />
      <FormInput control={control} name='password' placeholder='Password' type='password' />

      <FormButton>Log In</FormButton>
    </form>
  )
}
