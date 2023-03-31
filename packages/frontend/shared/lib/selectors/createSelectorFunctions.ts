import { StoreApi, UseBoundStore } from 'zustand'

export interface ZustandFuncSelectors<StateType> {
  use: {
    [key in keyof StateType]: () => StateType[key]
  }
}

function createSelectors<StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>>
): ZustandFuncSelectors<StateType> {
  return Object.keys(store.getState()).reduce(
    (accumulator, key) => {
      const selectorKey = key as keyof StateType
      accumulator.use[selectorKey] = () => store(state => state[selectorKey])
      return accumulator
    },
    { use: {} } as ZustandFuncSelectors<StateType>
  )
}

export function createSelectorFunctions<StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>>
): UseBoundStore<StoreApi<StateType>> & ZustandFuncSelectors<StateType> {
  const selectors = createSelectors<StateType>(store)
  const combinedStore = store as UseBoundStore<StoreApi<StateType>> & ZustandFuncSelectors<StateType>
  combinedStore.use = selectors.use
  return combinedStore
}
