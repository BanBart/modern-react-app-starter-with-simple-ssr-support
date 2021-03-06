import { useContext } from 'react'
import StoreContext from 'contexts/store_context'

const useStore = () => {
  return useContext(StoreContext)
}

const useLocaleStore = () => {
  return useContext(StoreContext).localeStore
}

const useRoutesStore = () => {
  return useContext(StoreContext).routesStore
}

const useExamplesStore = () => {
  return useContext(StoreContext).examplesStore
}

export { useStore, useLocaleStore, useRoutesStore, useExamplesStore }
