import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper/PageWrapper';

const AboutPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);

	return <PageWrapper>{t('about')}</PageWrapper>;
});

export default AboutPage;
