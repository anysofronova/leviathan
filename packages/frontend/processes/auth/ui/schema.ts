import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('required field').max(30, 'maximum 30 characters'),
  lastName: yup.string().required('required field').max(30, 'maximum 30 characters'),
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .email('invalid email')
    .max(30, 'maximum 30 characters'),
  password: yup.string().required('required field').min(8, 'minimum 8 characters').max(30, 'maximum 30 characters')
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('required field')
    .min(5, 'minimum 5 characters')
    .email('invalid email')
    .max(30, 'maximum 30 characters'),
  password: yup.string().required('required field').min(8, 'minimum 8 characters').max(30, 'maximum 30 characters')
})
