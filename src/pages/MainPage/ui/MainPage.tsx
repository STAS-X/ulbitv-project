import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper/PageWrapper';
import { Counter } from '@/entities/Common';
import { useSettingsByKey, useSettingsByUser } from '@/entities/User';

const MainPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);

	const isFirstVisit = useSettingsByKey('isFirstVisit');
	const settings = useSettingsByUser();
	//console.warn(isFirstVisit, settings, 'get isFirstVisit from back server');

	return (
		<PageWrapper data-testid={'MainPage'}>
			{t('main')}
			<Counter />
		</PageWrapper>
	);
});

export default MainPage;
