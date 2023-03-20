import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import i18n from '../../../config/i18n/i18nForTest';

export interface componentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
}

export default function componentRender(Component: ReactNode, options: componentRenderOptions = {}) {
	const { route = '/', initialState } = options;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState}>
				<I18nextProvider i18n={i18n}>{Component}</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	);
}
