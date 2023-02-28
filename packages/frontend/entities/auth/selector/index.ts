import { createDraftSafeSelector } from '@reduxjs/toolkit'

import { TypeRootState } from '#/shared/store'

export const authGeneralSelector = (state: TypeRootState) => state.auth
export const authStateSelector = createDraftSafeSelector(authGeneralSelector, state => state.user)

export const errorAuthStateSelector = createDraftSafeSelector(authGeneralSelector, state => state.isError)

export const loadingAuthStateSelector = createDraftSafeSelector(authGeneralSelector, state => state.isLoading)

export const errorMessageAuthStateSelector = createDraftSafeSelector(authGeneralSelector, state => state.message)
