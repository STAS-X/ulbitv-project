import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationRU from '../../../../public/locales/ru/translation.json';
import translationEN from '../../../../public/locales/en/translation.json';
import pagesRU from '../../../../public/locales/ru/pages.json';
import pagesEN from '../../../../public/locales/en/pages.json';
import errorsRU from '../../../../public/locales/ru/errors.json';
import errorsEN from '../../../../public/locales/en/errors.json';

const resources = {
	ru: {
		translation: translationRU,
		errors: errorsRU,
		pages: pagesRU,
	},
	en: {
		translation: translationEN,
		errors: errorsEN,
		pages: pagesEN,
	},
};

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		resources,
		debug: true,
		// have a common namespace used around the full app
		ns: ['pages'],
		defaultNS: 'pages',
		lng: 'ru',
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
	});

export default i18n;
