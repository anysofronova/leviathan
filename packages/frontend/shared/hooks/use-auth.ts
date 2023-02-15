import { authStateSelector } from '#/entities'

import { useAppSelector } from './use-app-selector'

export const useAuth = () => useAppSelector(authStateSelector)
