import { types } from 'mobx-state-tree'
import RoutesStore from '../routes_store/routes_store'
import LocaleStore from '../locale_store/locale_store'
import ExamplesStore from '../examples_store/examples_store'
import CharactersStore from '../characters_store/characters_store'

const AppStore = types.model('AppStore', {
  routesStore: types.optional(RoutesStore, {}),
  localeStore: types.optional(LocaleStore, {}),
  examplesStore: types.optional(ExamplesStore, {}),
  charactersStore: types.optional(CharactersStore, {}),
})

export default AppStore
