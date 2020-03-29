import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import XHRBackend from 'i18next-xhr-backend'

import translationEN from './locales/en/translation.json'
import translationPL from './locales/pl/translation.json'

i18n
  .use(initReactI18next)
  .use(XHRBackend)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translations: translationEN
      },
      pl: {
        translations: translationPL
      }
    },
    fallbackLng: 'en',
    debug: false,

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },

    react: {
      wait: true,
      useSuspense: false
    }
  })

export default i18n
