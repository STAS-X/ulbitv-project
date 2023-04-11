import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button/Button';

describe('button test', () => {
	const text = 'Test';

	let container: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
		//container = null;
	});

	test('first component test', () => {
		// Test first render and componentDidMount
		render(<Button>{text}</Button>);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
