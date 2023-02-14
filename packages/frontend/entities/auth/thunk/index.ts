import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authService } from '#/shared/api/services'
import { IUserLogin, IUserRegister } from '#/shared/types'

export const register = createAsyncThunk('auth/register', async (user: IUserRegister, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const errors = error instanceof AxiosError ? error?.response?.data?.errors : {}
    return thunkAPI.rejectWithValue(errors)
  }
})

export const login = createAsyncThunk('auth/login', async (user: IUserLogin, { rejectWithValue }) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const errors = error instanceof AxiosError ? error?.response?.data?.errors : {}
    return rejectWithValue(errors)
  }
})
