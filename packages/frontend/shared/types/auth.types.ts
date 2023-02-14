export interface IUserLogin {
  email: string
  password: string
}
export interface IUserRegister extends IUserLogin {
  firstName: string
  lastName: string
}

export interface ToolkitState {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
  errors?: BaseReqError | null
}

export interface AuthState extends ToolkitState {
  user: IUserLogin | null
}

export type BaseReqError = {
  [key: string]: string
}
