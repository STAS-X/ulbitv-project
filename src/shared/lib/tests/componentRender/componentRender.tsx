import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../../../config/i18n/i18nForTest';

export interface componentRenderOptions {
	route?: string;
}

export default function componentRender(Component: ReactNode, options: componentRenderOptions = {}) {
	const { route = '/' } = options;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<I18nextProvider i18n={i18n}>{Component}</I18nextProvider>
		</MemoryRouter>
	);
}
