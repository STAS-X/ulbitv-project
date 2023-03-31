import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';

const MainPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);
	return <div>{t('main')}</div>;
});

export default MainPage;
