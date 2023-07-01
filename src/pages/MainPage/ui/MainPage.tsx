import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper/PageWrapper';
import { Counter } from '@/entities/Common';

const MainPage: FC = memo(() => {
	const { t } = useTranslation(['pages']);
	return (
		<PageWrapper data-testid={'MainPage'}>
			{t('main')}
			<Counter />
		</PageWrapper>
	);
});

export default MainPage;
