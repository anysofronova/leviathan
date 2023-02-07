import { configureStore, ThunkAction, AnyAction, createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
  name: 'store',
  initialState: {},
  reducers: {}
})

export const store = configureStore({
  reducer: {
    test: testSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
