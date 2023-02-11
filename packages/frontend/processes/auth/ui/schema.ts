import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required field')
    .min(5, 'First name should be minimum 5 characters')
    .max(30, 'First name should be maximum 30 characters'),
  lastName: yup
    .string()
    .required('Last name is required field')
    .min(5, 'Last name should be minimum 5 characters')
    .max(30, 'Last name should be maximum 30 characters'),
  email: yup
    .string()
    .required('Email is required field')
    .min(5, 'Email should be minimum 5 characters')
    .email('invalid email')
    .max(30, 'Email should be maximum 30 characters'),
  password: yup
    .string()
    .required('Password is required field')
    .min(8, 'Password should be minimum 8 characters')
    .max(30, 'Password should be maximum 30 characters')
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required field')
    .min(5, 'Email should be minimum 5 characters')
    .email('Email should be invalid email')
    .max(30, 'Email should be maximum 30 characters'),
  password: yup
    .string()
    .required('Password is required field')
    .min(8, 'Password should be minimum 8 characters')
    .max(30, 'Password should be maximum 30 characters')
})
