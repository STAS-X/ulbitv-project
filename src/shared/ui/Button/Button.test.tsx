import { waitFor, screen } from '@testing-library/react';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';
import { Button } from './Button';

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

	test('first component test', async () => {
		// Test first render and componentDidMount
		await waitFor(() => componentRender(<Button>{text}</Button>));
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
