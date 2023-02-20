import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
	// .use(Backend)
	// .use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: 'ru',
		fallbackLng: 'ru',
		debug: false,
		// have a common namespace used around the full app
		ns: ['translations'],
		defaultNS: 'translations',
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;
