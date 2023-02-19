import { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';

// Компонент для тестирования
export const BagButton: FC = () => {
	const [error, setError] = useState(false);

	useEffect(() => {
		if (error) throw new Error('new error occured');
	}, [error]);

	const handleOnError = () => {
		setError(!error);
	};
	return (
		<Button type="button" style={{ display: 'block' }} onClick={handleOnError}>
			throw error
		</Button>
	);
};
