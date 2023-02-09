import { FormButton, FormInput } from '#/shared/ui'

export const FormRegister = () => {
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3'>
      <FormInput type='text' placeholder='First Name' />
      <FormInput type='text' placeholder='Last Name' />
      <FormInput type='email' placeholder='Email' />
      <FormInput type='password' placeholder='Password' />

      <FormButton>Sign Up</FormButton>
    </form>
  )
}
