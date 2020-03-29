import { types, getRoot, getEnv } from 'mobx-state-tree'

const RoutesStore = types
  .model('RoutesStore', {})
  .views(self => {
    return {
      i18nRoutes(path) {
        const { locale, isDefaultLocale } = getRoot(self).localeStore
        return isDefaultLocale ? path : `/${locale}${path}`
      },
      translatePathname(pathname, locale) {
        return {
          pl: pathname.replace(/^(\/en)/, ''),
          en: `/en${pathname}`
        }[locale]
      },
      get root() {
        return self.i18nRoutes('/')
      }
    }
  })
  .actions(self => {
    const { history } = getEnv(self)
    return {
      redirectToRoot() {
        history.push(self.root)
      }
    }
  })

export default RoutesStore
