import { useContext } from 'react';
import { Theme, ThemeContext } from 'app/providers/ThemeProvider/lib/ThemeContext';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export function useTheme(): UseThemeResult {
	const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);
	document.body.className = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ?? Theme.LIGHT;

	const toggleTheme = () => {
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
		setTheme?.(
			localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
				? (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)
				: theme === Theme.LIGHT
				? Theme.DARK
				: Theme.LIGHT
		);
	};

	const resultTheme: UseThemeResult = { theme: theme || Theme.LIGHT, toggleTheme };

	return resultTheme;
}
