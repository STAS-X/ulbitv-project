import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';

const AboutPage = memo<FC>(() => {
	const { t } = useTranslation(['pages']);

	return <div>{t('about')}</div>;
});

export default AboutPage;
