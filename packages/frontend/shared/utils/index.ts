import { SetState } from 'zustand'

export function withLoading<T extends (...args: any[]) => Promise<void>>(asyncFunc: T, set: SetState<unknown>) {
  return async (...args: Parameters<T>) => {
    try {
      set({ loading: true })
      await asyncFunc(...args)
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false })
    }
  }
}
