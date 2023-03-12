import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { useState } from 'react';

const MainPage = () => {
	const { t } = useTranslation(['pages']);

	const [value, setValue] = useState('test of input');
	const onChange = (val: string) => {
		setValue(val);
		console.log(`new value is ${val}`);
	};

	return (
		<div>
			{t('main')}
			<Input ref={null} placeholder={t('userName')} value={value} onChange={onChange} />
		</div>
	);
};

export default MainPage;
