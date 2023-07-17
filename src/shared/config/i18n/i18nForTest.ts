import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const initI18nTest = async () => {
	await i18n
		//.use(Backend)
		//.use(LanguageDetector)
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) =>
					import(`../../../../public/locales/${language}/${namespace}.json`)
			)
		)
		.init(
			{
				lng: 'ru',
				fallbackLng: 'ru',
				debug: false,
				returnNull: false,
				react: {
					useSuspense: false
				},
				partialBundledLanguages: true,
				ns: [],
				resources: {},
				// have a common namespace used around the full app
				// An array of the locales in your applications
				// Namespace separator used in your translation keys
				// If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.
				detection: {
					order: ['path'],
					lookupFromPathIndex: 0
				},
				interpolation: {
					escapeValue: false // not needed for react as it escapes by default
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

export default initI18nTest();
