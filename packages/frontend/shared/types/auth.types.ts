export interface IUser {
  email: string
  createdAt: string
  firstName: string
  lastName: string
  fullName: string
  id: number
  role: string
}

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
  user: IUser | null
}

export type BaseReqError = {
  [key: string]: string
}
