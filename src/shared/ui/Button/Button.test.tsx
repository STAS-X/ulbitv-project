import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button/Button';

describe('button test', () => {
	const text = 'Test';

	test('first component test', () => {
		render(<Button>{text}</Button>);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
