import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// import translationRU from '../../../../public/locales/ru/translation.json';
// import translationEN from '../../../../public/locales/en/translation.json';
// import pagesRU from '../../../../public/locales/ru/pages.json';
// import pagesEN from '../../../../public/locales/en/pages.json';
// import errorsRU from '../../../../public/locales/ru/errors.json';
// import errorsEN from '../../../../public/locales/en/errors.json';

// const resources = {
// 	ru: {
// 		translation: translationRU,
// 		errors: errorsRU,
// 		pages: pagesRU,
// 	},
// 	en: {
// 		translation: translationEN,
// 		errors: errorsEN,
// 		pages: pagesEN,
// 	},
// };
const initI18n = async () => {
	await i18n
		.use(Backend)
		.use(LanguageDetector)
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) =>
					import(`../../../../public/locales/${language}/${namespace}.json`)
			)
		)
		.init(
			{
				fallbackLng: 'ru',
				react: {
					useSuspense: false
				},
				//resources,
				debug: false, //_DEV_MODE_,
				returnNull: false,
				// have a common namespace used around the full app
				partialBundledLanguages: true,
				ns: [],
				resources: {},
				interpolation: {
					escapeValue: false // not needed for react as it escapes by default
				},
				backend: {
					loadPath: '/locales/{{lng}}/{{ns}}.json'
				}
			},
			(err) => {
				if (err) {
					console.log(err, 'error occured');
				} else console.log('init completed');
			}
		);
	return i18n;
};

export default initI18n();
