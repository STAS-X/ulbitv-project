import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';

const MainPage = memo<FC>(() => {
	const { t } = useTranslation(['pages']);

	return (
		<div>
			{t('main')}
			{/*<Input ref={null} placeholder={t('userName')} value={value} onChange={onChange} />*/}
		</div>
	);
});

export default MainPage;
