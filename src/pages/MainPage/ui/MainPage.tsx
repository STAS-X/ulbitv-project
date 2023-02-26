import { BagButton } from 'app/providers/error';
import { useTranslation } from 'react-i18next';


const MainPage = () => {
	const { t } = useTranslation(['pages']);

	return (
		<div>
			{t('main')}
			<BagButton />
		</div>
	);
};

export default MainPage;
