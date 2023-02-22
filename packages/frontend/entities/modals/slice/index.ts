import { createSlice } from '@reduxjs/toolkit'

type TState = {
  modalsAuth: boolean
  modalsCart: boolean
}
const initialState: TState = {
  modalsAuth: false,
  modalsCart: false
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showAuth: (state: TState) => {
      state.modalsAuth = true
      state.modalsCart = false
    },
    hideAuth: (state: TState) => {
      state.modalsAuth = false
    },
    showCart: (state: TState) => {
      state.modalsCart = true
      state.modalsAuth = false
    },
    hideCart: (state: TState) => {
      state.modalsCart = false
    }
  }
})

export const { showAuth, showCart, hideCart, hideAuth } = modalsSlice.actions
export const ModalsReducer = modalsSlice.reducer
