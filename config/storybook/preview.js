import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { RouterDecorator } from 'shared/config/storybook/RouterDecorator/RouterDecorator';
import { createContext, useState } from 'react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { NavigateDecorator } from 'shared/config/storybook/NavigateDecorator/NavigateDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	// Global parameter is optional.
	screenshot: {
		// Put global screenshot parameters(e.g. viewport)
		viewports: {
			large: {
				width: 1024,
				height: 768,
				isMobile: false,
				isLandscape: true
			},
			small: {
				width: 375,
				height: 668,
				isMobile: true,
				isLandscape: false
			},
			xsmall: {
				width: 320,
				height: 568,
				isMobile: true,
				isLandscape: true
			}
		},
		delay: 500,
		viewport: 'iPhone 7'
	},
	context: [defaultContext]
	// mockAddonConfigs: {
	// 	globalMockData: [
	// 		{
	// 			// An array of mock objects which will add in every story
	// 			url: 'http://localhost:8000',
	// 			method: 'GET',
	// 			status: 200,
	// 			response: { data: { message: 'test' } }
	// 		}
	// 	],
	// 	refreshStoryOnUpdate: true, // This re-render the story if there's any data changes
	// 	disable: true // This disables the panel from all the stories
	// }
};

const ThemeContext = createContext({
	theme: Theme.LIGHT,
	setTheme: useStoryTheme
});

const useStoryTheme = (defaultTheme) => {
	const [theme, setTheme] = useState(defaultTheme);

	return () => {
		setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
	};
};

// export const defaultView = () => <div />; // sample story in CSF format
// defaultView.story = {
// 	parameters: {
// 		context: [{ ...defaultContext }]
// 	}
// };

const defaultContext = {
	icon: 'globe',
	title: 'Themes',
	components: [ThemeContext.Provider],
	params: [
		// an array of params contains a set of predefined `props` for `components`
		{
			name: 'Light Theme',
			props: { value: { theme: Theme.LIGHT, setTheme: useStoryTheme } },
			default: true
		},
		{
			name: 'Dark Theme',
			props: { value: { theme: Theme.DARK, setTheme: useStoryTheme } }
		}
	],
	options: {
		deep: true, // pass the `props` deeply into all wrapping components
		disable: false, // disable this contextual environment completely
		cancelable: false // allow this contextual environment to be opt-out optionally in toolbar
	}
};

export const decorators = [
	StyleDecorator,
	ThemeDecorator(Theme.LIGHT),
	SuspenseDecorator,
	StoreDecorator({ loginForm: { username: 'test', password: '123' } }),
	NavigateDecorator,
	RouterDecorator
];

//addDecorator(withScreenshot);
//addParameters({ screenshot: { ...parameters.screenshot } });
