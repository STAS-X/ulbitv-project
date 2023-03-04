import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

const MainPage = () => {
	const { t } = useTranslation(['pages']);

	return (
		<div>
			{t('main')}
			<Counter counterValue={5} />
		</div>
	);
};

export default MainPage;
