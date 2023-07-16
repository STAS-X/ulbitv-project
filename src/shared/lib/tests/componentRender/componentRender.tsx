import { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { I18nextProvider, I18nextProviderProps } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import i18n from '../../../config/i18n/i18nForTest';
import RouterUtils from '../../hooks/useRouterUtils';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { Theme } from '@/shared/const/theme';

export interface componentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
	translater?: I18nextProviderProps['i18n'];
	theme?: Theme;
	children?: ReactNode;
}

export const TestComponentRender = (props: componentRenderOptions) => {
	const { route = '/', initialState, asyncReducers = {}, translater, theme = Theme.ORANGE, children } = props;

	const [I18nComponent, setI18nComponent] = useState<I18nextProviderProps['i18n'] | null>(
		translater ? translater : null
	);

	useEffect(() => {
		const asyncLoadingI18 = async () => {
			const loadedI18n = await i18n;
			setI18nComponent(loadedI18n);
		};
		if (!translater) void asyncLoadingI18();
	}, [setI18nComponent, translater]);

	if (I18nComponent)
		return (
			<MemoryRouter initialEntries={[route]}>
				<RouterUtils>
					<StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
						<ThemeProvider toTheme={theme}>
							<div className={`app ${theme}`}>
								<I18nextProvider i18n={I18nComponent}>{children}</I18nextProvider>
							</div>
						</ThemeProvider>
					</StoreProvider>
				</RouterUtils>
			</MemoryRouter>
		);
	return <>{'Loading i18n component'}</>;
};

export default async function componentRender(Component: ReactNode, options: componentRenderOptions = {}) {
	const container = document.createElement('div');
	container.setAttribute('id', 'project-root');
	document.getElementById('project-root')?.remove();
	document.body.appendChild(container);

	const root = createRoot(container);
	return root.render(
		<TestComponentRender {...options} translater={await i18n}>
			{Component}
		</TestComponentRender>
	);
}
