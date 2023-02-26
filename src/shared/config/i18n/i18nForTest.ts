import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
	//.use(Backend)
	//.use(LanguageDetector)
	.use(initReactI18next)
	.use(
		resourcesToBackend(
			(language: string, namespace: string) => import(`../../../../public/locales/${language}/${namespace}.json`)
		)
	)
	.init({
		lng: 'ru',
		fallbackLng: 'ru',
		debug: false,
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
	});

export default i18n;
