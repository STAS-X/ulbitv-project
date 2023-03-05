import { fireEvent, screen } from '@testing-library/react';
import { StateSchema } from 'app/providers/StoreProvider';
import componentStore from 'shared/lib/tests/componentStore/componentStore';
import { Counter } from './Counter';

const initialState: StateSchema = {
	counter: { value: 8 },
	user: { authData: { id: '', userName: '' } }
};

describe('Counter component test', () => {
	test('Counter redux component render', () => {
		componentStore(<Counter />, initialState);
		expect(screen.getByTestId('counter')).toBeInTheDocument();
	});

	test('Counter with initial state', () => {
		componentStore(<Counter />, initialState);
		const titleCounter = screen.getByTestId('counter-value');
		expect(titleCounter).toHaveTextContent('8');
	});

	test('Counter with change state', () => {
		componentStore(<Counter />, initialState);
		const incrementBtn = screen.getByTestId('increment-btn');
		const decrementBtn = screen.getByTestId('decrement-btn');

		fireEvent.click(incrementBtn);
		expect(screen.getByTestId('counter-value')).toHaveTextContent('9');
		fireEvent.click(decrementBtn);
		expect(screen.getByTestId('counter-value')).toHaveTextContent('8');
	});
});
