import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationDE from '../locales/de/translation.yml';
import translationEN from '../locales/en/translation.yml';
import translationFR from '../locales/fr/translation.yml';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      de: { translation: translationDE },
      fr: { translation: translationFR },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;