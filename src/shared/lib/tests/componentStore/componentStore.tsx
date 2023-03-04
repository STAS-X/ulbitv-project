import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { render } from '@testing-library/react';

export default function componentStore(Component: ReactNode, initialState?: StateSchema) {
	const store = createReduxStore(initialState ?? undefined);

	return render(<Provider store={store}>{Component}</Provider>);
}
