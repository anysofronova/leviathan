import { create } from 'zustand'

type TState = {
  modalsAuth: boolean
  modalsCart: boolean
}

type TActions = {
  showAuth: () => void
  hideAuth: () => void
  showCart: () => void
  hideCart: () => void
}

type TStore = TState & TActions

export const useModal = create<TStore>(set => ({
  modalsAuth: false,
  modalsCart: false,
  showAuth: () => {
    set(state => ({
      ...state,
      modalsAuth: true,
      modalsCart: false
    }))
  },
  hideAuth: () => {
    set(state => ({
      ...state,
      modalsAuth: false
    }))
  },
  showCart: () => {
    set(state => ({
      ...state,
      modalsCart: true,
      modalsAuth: false
    }))
  },
  hideCart: () => {
    set(state => ({
      ...state,
      modalsCart: false
    }))
  }
}))
