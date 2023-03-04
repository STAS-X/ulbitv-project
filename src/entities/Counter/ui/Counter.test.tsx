import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter component test', () => {
	test('Counter redux component render', () => {
		render(<Counter />);
		expect(screen.getByTestId('counter')).toBeInTheDocument();
	});

	test('Counter redux initial state', () => {
		render(<Counter />);
		const titleCounter = screen.getByTestId('counter-value');
		expect(titleCounter).toHaveValue(0);
	});

	test('Counter redux initial state', () => {
		render(<Counter />);
		const incrementBtn = screen.getByTestId('increment-btn');
		const decrementBtn = screen.getByTestId('decrement-btn');

		fireEvent.click(incrementBtn);
		expect(screen.getByTestId('counter-value')).toHaveValue(1);
		fireEvent.click(decrementBtn);
		expect(screen.getByTestId('counter-value')).toHaveValue(0);
	});
});
