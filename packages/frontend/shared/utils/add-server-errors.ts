export const addServerErrors = <T>(
  errors: { [P in keyof T]?: string | string[] },
  setError: (fieldName: keyof T, error: { type: string; message: string }) => void
) => {
  return (
    errors &&
    Object.keys(errors).forEach(key => {
      setError(key as keyof T, {
        type: key,
        message: Array.isArray(errors[key as keyof T])
          ? (errors[key as keyof T] as string[]).join('')
          : (errors[key as keyof T] as string)
      })
    })
  )
}
