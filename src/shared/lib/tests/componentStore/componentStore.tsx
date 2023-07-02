import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { createRoot } from 'react-dom/client';

// const container = document.createElement('div');
// container.setAttribute('id', 'project-root');
// document.body.appendChild(container);
// const root = createRoot(container);

export default function componentStore(Component: ReactNode, initialState: Partial<StateSchema>) {
	const store = createReduxStore(initialState);

	const container = document.createElement('div');
	container.setAttribute('id', 'project-root');
	document.getElementById('project-root')?.remove();
	document.body.appendChild(container);

	const root = createRoot(container);

	return root.render(<Provider store={store}>{Component}</Provider>);
}
