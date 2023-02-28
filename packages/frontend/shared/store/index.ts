import { configureStore } from '@reduxjs/toolkit'

import { AuthReducer, ModalsReducer, ProductsReducer } from '#/entities'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductsReducer,
    modals: ModalsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type TypeRootState = ReturnType<typeof store.getState>
