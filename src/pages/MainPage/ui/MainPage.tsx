import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';

const MainPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);
	return <PageWrapper>{t('main')}</PageWrapper>;
});

export default MainPage;
