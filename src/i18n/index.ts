import i18next from 'i18next';
// import RNLocalize from 'react-native-localize';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import es from './translations/es.json';
import pt from './translations/pt.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',

  lng: 'pt',
  fallbackLng: 'pt',

  ns: ['translation'],
  defaultNS: 'translation',

  resources: { en, pt, es },

  react: { useSuspense: false },
  interpolation: { escapeValue: false },
});

export { i18next };
