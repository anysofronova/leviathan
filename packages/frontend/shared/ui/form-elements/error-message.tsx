'use client'

import { cloneElement, ComponentType, createElement, Fragment, isValidElement, ReactElement } from 'react'
import { FieldErrors, get, useFormContext } from 'react-hook-form'

import { Props } from './types'

const ErrorMessage = <
  TFieldErrors extends FieldErrors,
  TAs extends undefined | ReactElement | ComponentType<any> | keyof JSX.IntrinsicElements = undefined
>({
  as,
  errors,
  name,
  message,
  render,
  ...rest
}: Props<TFieldErrors, TAs>) => {
  const methods = useFormContext()
  const error = get(errors || methods?.formState?.errors, name)

  if (!error) {
    return null
  }

  const { message: messageFromRegister, types } = error
  const props = Object.assign({}, rest, {
    children: messageFromRegister || message
  })

  return isValidElement(as)
    ? cloneElement(as, props)
    : render
    ? (render({
        message: messageFromRegister || message,
        messages: types
      }) as ReactElement)
    : createElement((as as string) || Fragment, props)
}

export { ErrorMessage }
