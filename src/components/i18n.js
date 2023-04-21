import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationES from './idiomas/es.json';
import translationEN from './idiomas/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    es: {
      translation: translationES,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
