import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';
import { Counter } from '@/entities/Common';

const MainPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);

	//console.warn(isFirstVisit, settings, 'get isFirstVisit from back server');

	return (
		<PageWrapper data-testid={'MainPage'}>
			{t('main')}
			<Counter />
		</PageWrapper>
	);
});

export default MainPage;
