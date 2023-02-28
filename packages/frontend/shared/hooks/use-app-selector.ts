import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '#/shared/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
