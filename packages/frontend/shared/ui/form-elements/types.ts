import { ComponentType, ReactElement } from 'react'
import { FieldErrors, FieldName, Message, MultipleFieldErrors } from 'react-hook-form'

type Assign<T extends object, U extends object> = T & Omit<U, keyof T>

export type FieldValuesFromFieldErrors<TFieldErrors> = TFieldErrors extends FieldErrors<infer TFieldValues>
  ? TFieldValues
  : never

type AsProps<TAs> = TAs extends undefined
  ? Record<string, any>
  : TAs extends ReactElement
  ? Record<string, any>
  : TAs extends ComponentType<infer P>
  ? Omit<P, 'children'>
  : TAs extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[TAs]
  : never

export type Props<
  TFieldErrors extends FieldErrors,
  TAs extends undefined | ReactElement | ComponentType<any> | keyof JSX.IntrinsicElements
> = Assign<
  {
    as?: TAs
    errors?: TFieldErrors
    name: FieldName<FieldValuesFromFieldErrors<TFieldErrors>>
    message?: Message
    render?: (data: { message: Message; messages?: MultipleFieldErrors }) => React.ReactNode
  },
  AsProps<TAs>
>
