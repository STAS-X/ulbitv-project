import { fireEvent, screen } from '@testing-library/react';
import componentStore from 'shared/lib/tests/componentStore/componentStore';
import { StateSchema } from 'app/providers/StoreProvider';
import { Counter } from './Common';
import { rtkApi } from 'shared/api/rtkApi';

const initialState: StateSchema = {
	common: { value: 8, isLazyModal: false },
	user: { _loaded: true },
	[rtkApi.reducerPath]: rtkApi.reducer as unknown as ReturnType<typeof rtkApi.reducer>
};

describe('Counter component test', () => {
	test('Counter redux component render', () => {
		componentStore(<Counter />, initialState);
		expect(screen.getByTestId('common')).toBeInTheDocument();
	});

	test('Counter with initial state', () => {
		componentStore(<Counter />, initialState);
		const titleCounter = screen.getByTestId('common-value');
		expect(titleCounter).toHaveTextContent('8');
	});

	test('Counter with change state', () => {
		componentStore(<Counter />, initialState);
		const incrementBtn = screen.getByTestId('increment-btn');
		const decrementBtn = screen.getByTestId('decrement-btn');

		fireEvent.click(incrementBtn);
		expect(screen.getByTestId('common-value')).toHaveTextContent('9');
		fireEvent.click(decrementBtn);
		expect(screen.getByTestId('common-value')).toHaveTextContent('8');
	});
});
