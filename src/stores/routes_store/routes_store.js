import { types, getRoot, getEnv } from 'mobx-state-tree'
import { slugify } from 'utils/slugify'

const RoutesStore = types.model('RoutesStore', {}).views(self => {
  const { i18n } = getEnv(self)

  return {
    i18nRoutes(path) {
      return getRoot(self).filterStore.isPolishLocale ? path : `/en${path}`
    },
    get root() {
      return self.i18nRoutes('/')
    }
  }
})

export default RoutesStore
