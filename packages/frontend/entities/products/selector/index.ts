import { createDraftSafeSelector } from '@reduxjs/toolkit'

import { TypeRootState } from '#/shared/store'

export const productsGeneralSelector = (state: TypeRootState) => state.products
export const productsStateSelector = createDraftSafeSelector(productsGeneralSelector, state => state.products)