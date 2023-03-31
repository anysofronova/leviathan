import { create } from 'zustand'

import { createSelectorFunctions } from '#/shared/lib/selectors'

type TState = {
  modalsAuth: boolean
  modalsCart: boolean
}

type TActions = {
  toggleAuth: (visible?: boolean) => void
  toggleCart: (visible?: boolean) => void
}

type TStore = TState & TActions

const toggleModal = (key: keyof TState, value?: boolean) => (state: TState) => ({
  ...state,
  [key]: value === undefined ? !state[key] : value
})

export const useModal = create<TStore>(set => ({
  modalsAuth: false,
  modalsCart: false,
  toggleAuth: visible => set(toggleModal('modalsAuth', visible)),
  toggleCart: visible => set(toggleModal('modalsCart', visible))
}))

export const modalSelectors = createSelectorFunctions(useModal)
