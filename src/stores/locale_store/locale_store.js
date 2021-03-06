import { types, getEnv, getRoot } from 'mobx-state-tree'
import { includes } from 'lodash'

const PL = 'pl'
const EN = 'en'
const AVAILABLE_LOCALES = [PL, EN]

const LocaleStore = types
  .model('LocaleStore', {
    locale: types.optional(
      types.enumeration(AVAILABLE_LOCALES),
      AVAILABLE_LOCALES[0]
    )
  })
  .views(self => {
    return {
      get availableLocales() {
        return AVAILABLE_LOCALES
      },
      get isDefaultLocale() {
        return self.locale === AVAILABLE_LOCALES[0]
      },
      get isPolishLocale() {
        return self.locale === PL
      },
      get isEnglishLocale() {
        return self.locale === EN
      }
    }
  })
  .actions(self => {
    const { i18n, history } = getEnv(self)

    return {
      afterCreate() {
        self.initializeLocale()
      },
      initializeLocale() {
        const i18nLanguage = i18n.language.split('-')[0]
        self.setLocale(
          includes(AVAILABLE_LOCALES, i18nLanguage)
            ? i18nLanguage
            : AVAILABLE_LOCALES[0]
        )
      },
      setLocale(value) {
        self.locale = value
        i18n.changeLanguage(value)
      },
      toggleLocale() {
        const { translatePathname } = getRoot(self).routesStore
        const newLocale = self.isPolishLocale ? EN : PL

        history.push(translatePathname(history.location.pathname, newLocale))
      }
    }
  })

export default LocaleStore
