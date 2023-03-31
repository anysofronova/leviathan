import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: (typeof window !== 'undefined' && (localStorage.getItem('i18nextLng') as string)) || 'en',
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    fallbackLng: (typeof window !== 'undefined' && (localStorage.getItem('i18nextLng') as string)) || 'en',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n
