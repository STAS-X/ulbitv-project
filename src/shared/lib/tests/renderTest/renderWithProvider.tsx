import { render } from '@testing-library/react';
import { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../config/i18n/i18nForTest';

export default async function renderWithProvider(Component: ReactNode) {
	return render(
		<Suspense fallback="">
			<I18nextProvider i18n={await i18n}>{Component}</I18nextProvider>
		</Suspense>
	);
}
