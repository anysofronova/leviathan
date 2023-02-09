import { FormButton, FormInput } from '#/shared/ui'

export const FormLogin = () => {
  return (
    <form className='mx-auto mb-3 w-[300px] space-y-3'>
      <FormInput type='email' placeholder='Email' />
      <FormInput type='password' placeholder='Password' />

      <FormButton>Log In</FormButton>
    </form>
  )
}
