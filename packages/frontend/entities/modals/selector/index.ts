import { createDraftSafeSelector } from '@reduxjs/toolkit'

import { TypeRootState } from '#/shared/store'

export const modalsGeneralSelector = (state: TypeRootState) => state.modals
export const modalsAuthStateSelector = createDraftSafeSelector(modalsGeneralSelector, state => state.modalsAuth)

export const modalsCartStateSelector = createDraftSafeSelector(modalsGeneralSelector, state => state.modalsCart)
