import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { formatPrice } from 'lib/helpers';
import { ru, en } from './resources';


const domainDetector = {
  name: 'domain',
  lookup: () => {
    if (!window) {
      return null;
    }

    return 'ru'; // TODO: make language detection.
  },
};

const detector = new LngDetector();
detector.addDetector(domainDetector);

i18n.use(detector).init({
  detection: {
    order: ['querystring', 'localStorage', 'domain', 'route', 'navigator'],

    lookupQuerystring: 'lng',

    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
  },

  interpolation: {
    escapeValue: false,
    format: (value, format) => {
      if (format === 'formatPrice') return formatPrice(value);
      return value;
    },
  },

  resources: {
    ru,
    en,
  },

  fallbackLng: {
    'uk-UA': ['ru'],
    uk: ['ru'],
    default: ['en'],
  },

  ns: [
    'common',
  ],

  defaultNS: 'common',

  debug: process.env.NODE_ENV !== 'production',
  react: {
    useSuspense: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'fallback',
  },
});

export default i18n;
