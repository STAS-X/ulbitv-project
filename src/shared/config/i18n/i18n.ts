import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationRU from '../../../../public/locales/ru/translation.json';
import translationEN from '../../../../public/locales/en/translation.json';
import pagesRU from '../../../../public/locales/ru/pages.json';
import pagesEN from '../../../../public/locales/en/pages.json';

const resources = {
	ru: {
		translation: translationRU,
		pages: pagesRU,
	},
	en: {
		translation: translationEN,
		pages: pagesEN,
	},
};

i18n
// .use(Backend)
// .use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		resources,
		debug: _DEV_MODE_,

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;
