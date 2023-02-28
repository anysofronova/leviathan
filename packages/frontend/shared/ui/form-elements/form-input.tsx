import classNames from 'classnames'
import get from 'lodash.get'
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

import { ErrorMessage } from '#/shared/ui/form-elements/error-message'
import { FormErrorMessage } from '#/shared/ui/form-elements/form-error-message'
import { Input, InputProps } from '#/shared/ui/form-elements/input'

export type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  type?: 'text' | 'email' | 'password'
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name' | 'type' | 'id'>

export const FormInput = <TFormValues extends Record<string, string>>({
  name,
  register,
  rules,
  errors,
  type = 'text',
  className,
  ref,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={classNames('w-full', className)} aria-live='polite'>
      <Input
        ref={ref}
        name={name}
        type={type}
        hasErrors={hasError}
        {...props}
        {...(register && register(name, rules))}
      />
      {errorMessages?.message && errorMessages?.message?.length > 0 && (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>}
        />
      )}
    </div>
  )
}
