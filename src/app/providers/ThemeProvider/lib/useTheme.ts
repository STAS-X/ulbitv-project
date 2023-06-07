import { useContext } from 'react';
import { Theme, ThemeContext } from '@/app/providers/ThemeProvider/lib/ThemeContext';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export function useTheme(): UseThemeResult {
	const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);
	document.body.className = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ?? Theme.LIGHT;

	const toggleTheme = () => {
		let newTheme: Theme;
		switch (theme) {
			case Theme.LIGHT:
				newTheme = Theme.DARK;
				break;
			case Theme.DARK:
				newTheme = Theme.ORANGE;
				break;
			case Theme.ORANGE:
				newTheme = Theme.LIGHT;
				break;
			default:
				newTheme = Theme.LIGHT;
		}
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		setTheme?.(newTheme);
	};

	const resultTheme: UseThemeResult = { theme: theme || Theme.LIGHT, toggleTheme };

	return resultTheme;
}
