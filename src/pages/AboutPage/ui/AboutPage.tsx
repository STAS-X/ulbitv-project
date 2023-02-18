import { useTranslation } from 'react-i18next';

const AboutPage = () => {
	const { t } = useTranslation(['pages']);

	return <div>{t('about')}</div>;
};

export default AboutPage;
