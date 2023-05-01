import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import i18n from '../../../config/i18n/i18nForTest';
import RouterUtils from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';

export interface componentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
}

export default async function componentRender(Component: ReactNode, options: componentRenderOptions = {}) {
	const { route = '/', initialState } = options;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<RouterUtils>
				<StoreProvider initialState={initialState}>
					<I18nextProvider i18n={await i18n}>{Component}</I18nextProvider>
				</StoreProvider>
			</RouterUtils>
		</MemoryRouter>
	);
}
