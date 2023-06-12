import { fireEvent, screen, waitFor } from '@testing-library/react';
import componentStore from '@/shared/lib/tests/componentStore/componentStore';
import { Counter } from './Common';
import { StateSchema } from '@/app/providers/StoreProvider';

const initialState: Partial<StateSchema> = {
	common: { value: 8, isLazyModal: false },
	user: { _loaded: true }
};

describe('Counter component test', () => {
	test('Counter redux component render', async () => {
		await waitFor(() => componentStore(<Counter />, initialState));
		expect(screen.getByTestId('common')).toBeInTheDocument();
	});

	test('Counter with initial state', async () => {
		await waitFor(() => componentStore(<Counter />, initialState));
		const titleCounter = screen.getByTestId('common-value');
		expect(titleCounter).toHaveTextContent('8');
	});

	test('Counter with change state', async () => {
		await waitFor(() => componentStore(<Counter />, initialState));
		const incrementBtn = screen.getByTestId('increment-btn');
		const decrementBtn = screen.getByTestId('decrement-btn');

		fireEvent.click(incrementBtn);
		expect(screen.getByTestId('common-value')).toHaveTextContent('9');
		fireEvent.click(decrementBtn);
		expect(screen.getByTestId('common-value')).toHaveTextContent('8');
	});
});
