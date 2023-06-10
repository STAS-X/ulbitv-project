import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper/PageWrapper';
import { Rating } from '@/entities/Rating';

const AboutPage: FC = memo(() => {
	const { t } = useTranslation(['translation', 'pages']);

	return <PageWrapper>{t('about')}</PageWrapper>;
});

export default AboutPage;
