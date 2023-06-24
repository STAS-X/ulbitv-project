import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18n from '../../../config/i18n/i18nForTest';
import RouterUtils from '../../hooks/useRouterUtils';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';

export interface componentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

const container = document.createElement('div');
container.setAttribute('id', 'project-root');
document.body.appendChild(container);
const root = createRoot(container);

export default async function componentRender(Component: ReactNode, options: componentRenderOptions = {}) {
	const { route = '/', initialState, asyncReducers = {} } = options;

	return root.render(
		<MemoryRouter initialEntries={[route]}>
			<RouterUtils>
				<StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
					<I18nextProvider i18n={await i18n}>{Component}</I18nextProvider>
				</StoreProvider>
			</RouterUtils>
		</MemoryRouter>
	);
}
