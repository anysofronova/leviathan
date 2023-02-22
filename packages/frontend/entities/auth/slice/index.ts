import { AnyAction, createSlice } from '@reduxjs/toolkit'

import { AuthState } from '#/shared/types'

import { login, logout, register } from '../thunk'

const initialState: AuthState = {
  // user: tokenService.getUser(),
  user: {
    email: 'm.yakushev23@gmail.com',
    createdAt: '2023-02-19T20:16:45.783Z',
    firstName: 'Maxim',
    lastName: 'Yakushev',
    fullName: 'Maxim Yakushev',
    id: 1,
    role: 'USER'
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  errors: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state: AuthState) => {
      state.user = null
    },
    reset: (state: AuthState) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state: AuthState) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state: AuthState) => {
        state.isLoading = false
      })
      .addCase(register.rejected, (state: AuthState, action: AnyAction) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.pending, (state: AuthState) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.isLoading = false
      })
      .addCase(logout.rejected, (state: AuthState, action: AnyAction) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state: AuthState, action: AnyAction) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state: AuthState, action: AnyAction) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  }
})

export const { reset, removeUser } = authSlice.actions
export const AuthReducer = authSlice.reducer
