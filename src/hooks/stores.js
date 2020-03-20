import { useContext } from 'react'
import StoreContext from 'contexts/store_context'

const useStore = () => {
  return useContext(StoreContext)
}

const useFilterStore = () => {
  return useContext(StoreContext).filterStore
}

const useRoutesStore = () => {
  return useContext(StoreContext).routesStore
}

export { useStore, useFilterStore, useRoutesStore }
