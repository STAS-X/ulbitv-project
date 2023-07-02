import { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../config/i18n/i18nForTest';
import { createRoot } from 'react-dom/client';

// const container = document.createElement('div');
// container.setAttribute('id', 'project-root');
// document.body.appendChild(container);
// const root = createRoot(container);

export default async function renderWithProvider(Component: ReactNode) {
	const container = document.createElement('div');
	container.setAttribute('id', 'project-root');
	document.getElementById('project-root')?.remove();
	document.body.appendChild(container);

	const root = createRoot(container);

	return root.render(
		<Suspense fallback="">
			<I18nextProvider i18n={await i18n}>{Component}</I18nextProvider>
		</Suspense>
	);
}
