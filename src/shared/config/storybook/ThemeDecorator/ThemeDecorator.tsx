import { Story } from '@storybook/react';
import { Children, cloneElement, FC, isValidElement, ReactNode, useState } from 'react';
import { Theme, ThemeContext } from '@/app/providers/ThemeProvider/lib/ThemeContext';
import '@/app/styles/index.scss';
import { LOCAL_STORAGE_THEME_KEY } from '@/app/providers/ThemeProvider/lib/useTheme';

export interface StoryContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
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
