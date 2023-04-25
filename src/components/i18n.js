import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './idiomas/es.json';
import en from './idiomas/en.json';
const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;