import { StoryFn } from '@storybook/react';
import { Children, cloneElement, FC, isValidElement, ReactNode, useState } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import '@/app/styles/index.scss';
import { setInitFeatureFlags } from '../../../lib/features/featureFlag';

export interface StoryContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => {
	return (
		<ThemeStoryProvider initialValue={theme}>
			<div className={`app ${theme}`}>
				<StoryComponent />
			</div>
		</ThemeStoryProvider>
	);
};

interface ThemeStoryProps {
	children?: ReactNode;
	initialValue?: Theme;
}

const ThemeStoryProvider: FC<ThemeStoryProps> = ({ children, initialValue = Theme.LIGHT }) => {
	const [theme, setTheme] = useState<Theme>(initialValue);

	// Сбрасываем настройки фичей для показа default компонентов в сторибуке
	setInitFeatureFlags({});

	const toggletheme = () => {
		setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme: toggletheme }}>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					const el = child as JSX.Element;
					//console.log(el, 'type element');
					if (el.type === 'div' && el.props?.className)
						return cloneElement(el, {
							...el.props,
							className: `app ${theme}`
						});
				}
				return child;
			})}
		</ThemeContext.Provider>
	);
};
